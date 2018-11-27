import Joi from 'joi';
import jwt from 'jsonwebtoken';
import users from '../models/users';
import orders from '../models/orders';

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
    Joi.validate(req.body, schema, (err) => {
      if (err) {
        console.log(err);
        return res.status(403).send({ message: 'Wrong input' });
      }
      const newUser = {
        id: users.length + 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
        usertype: req.body.usertype,
      };
      users.push(newUser);
      return res.status(200).send(newUser);
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
    if (!order) {
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
