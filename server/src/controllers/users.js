import Joi from 'joi';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import users from '../models/users';
import orders from '../models/orders';
import helpers from '../helpers/index';
import execute from '../db/index';

class Users {
  // Method to create user
  static create(req, res) {
    const schema = Joi.object().keys({
      firstname: Joi.string().alphanum().min(2).max(25)
        .required(),
      lastname: Joi.string().alphanum().min(2).max(25)
        .required(),
      username: Joi.string().email({ minDomainAtoms: 2 }).required(),
      password: Joi.string().required().min(3),
      usertype: Joi.string().alphanum().required(),
    });
    Joi.validate(req.body, schema, async (err) => {
      if (err) {
        return res.status(400).send({ message: 'Incorrect input! Try again' });
      }
      const sql = 'INSERT INTO users(firstname, lastname, username, password, usertype) VALUES ($1, $2, $3, $4, $5) RETURNING id';
      const data = [
        req.body.firstname, req.body.lastname,
        req.body.username, helpers.hashPassword(req.body.password), req.body.usertype,
      ];
      const result = await execute(sql, data);
      if (result.rows) {
        const record = result.rows[0];
        res.status(201).send({
          success: true, user: record.id,
        });
      }
      return res.status(400).send({
        message: 'There is a user with this Username! change it please!',
      });
    });
  }

  // Method to get all users
  static fetchAll(req, res) {
    res.status(200).send(users);
  }

  // method to get one user by id
  static fetchOneUser(req, res) {
    const user = users.find(u => u.id === parseInt(req.params.id, 10));
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    return res.status(200).send(user);
  }

  // Method to fetch parcel orders of one user
  static fetchOrders(req, res) {
    const order = orders.filter(o => o.senderId === parseInt(req.params.id, 10));
    if (order.length === 0) {
      return res.status(404).send({ message: 'No order for this user' });
    }
    return res.status(200).send(order);
  }

  // Method for user Log In
  static logIn(req, res) {
    const queryDb = async () => {
      if (req.body.username.length === 0 || req.body.password.length === 0) {
        return res.status(400).send('Inputs Can not be empty!!');
      }
      const queryUser = 'SELECT id, username, password, usertype FROM users WHERE username = $1';
      const data = [
        req.body.username,
      ];

      const result = await execute(queryUser, data);
      const record = result.rows[0];
      if (result.rows.length !== 0) {
        if (!bcrypt.compareSync(req.body.password, record.password)) {
          return res.status(404).send({ message: 'Password is incorrect' });
        }
        return jwt.sign({ record }, 'AuthenticationKey', (err, token) => {
          res.json({
            token,
          });
        });
      }
      return res.status(400).send({ message: 'Wrong Inputs!! Try again' });
    };
    queryDb();
  }
}

export default Users;
