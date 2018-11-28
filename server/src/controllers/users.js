import Joi from 'joi';
import jwt from 'jsonwebtoken';
import users from '../models/users';
import orders from '../models/orders';
import helpers from '../helpers/index';
import execute from '../db/index';

class Users {
  // Method to create user
  static create(req, res) {
    const schema = Joi.object().keys({
      firstname: Joi.string().trim().required(),
      lastname: Joi.string().trim().required(),
      username: Joi.string().trim().required(),
      password: Joi.string().trim().required(),
      usertype: Joi.string().trim().required(),
    });
    Joi.validate(req.body, schema, async (err) => {
      if (err) {
        console.log(err);
        return res.status(403).send({ message: 'Wrong input' });
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
        message: 'This username already exists'
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
    const ExistingUser = users.find(user => user.username === req.body.username && user.password === req.body.password);
    if (!ExistingUser) {
      return res.status(404).send({ message: 'User Not Found' });
    }
    return jwt.sign({ ExistingUser }, 'AuthenticationKey', (err, token) => {
      res.json({
        token,
        User: ExistingUser,
      });
    });
  }
}

export default Users;
