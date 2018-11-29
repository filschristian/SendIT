import Joi from 'joi';
import jwt from 'jsonwebtoken';
import helpers from '../helpers';
import orders from '../models/orders';
import execute from '../db/index';

class Orders {
  // Method to create an order
  static create(req, res) {
    const schema = Joi.object().keys({
      descr: Joi.string().trim().min(3).required(),
      location: Joi.string().trim().min(3).required(),
      destination: Joi.string().trim().min(3).required(),
      quantity: Joi.number().min(1).required(),
      senderId: Joi.number().min(1).required(),
    });
    Joi.validate(req.body, schema, async (err) => {
      if (err) {
        return res.status(400).send({ message: 'Wrong input' });
      }
      const orderDate = new Date();
      const sql = 'INSERT INTO orders(description, location, destination, quantity, price, orderDate, senderId, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id';
      const data = [
        req.body.descr, req.body.location, req.body.destination,
        req.body.quantity, helpers.calculatePrice(req.body.quantity), orderDate,
        req.body.senderId, 'In transit',
      ];
      const result = await execute(sql, data);
      if (typeof result === 'object') {
        const record = result.rows[0];
        return res.status(201).send({
          success: true, order: record.id,
        });
      }
      return res.status(400).send({
        message: 'This User ID is not valid ',
      });
    });
  }

  // method to fetch all parcels
  static fetchAll(req, res) {
    return res.status(201).send({
      orders,
    });
  }

  // method to fetch a specific order
  static fetchOneOrder(req, res) {
    const order = orders.find(o => o.id === parseInt(req.params.id, 10));
    if (!order) {
      return res.status(404).send('Order not found');
    }
    return res.status(200).send(order);
  }

  // Method to cancel an order
  static cancelOrder(req, res) {
    const order = orders.find(o => o.id === parseInt(req.params.id, 10));
    if (!order) {
      return res.status(404).send('Order not found');
    }
    order.status = 'canceled';
    return res.status(200).send(order);
  }

  // Method to delete an order
  static deleteOrder(req, res) {
    const order = orders.find(o => o.id === parseInt(req.params.id, 10));
    if (!order) {
      return res.status(404).send('order not found');
    }
    const index = orders.indexOf(order);
    orders.splice(index, 1);
    return res.status(200).send(order);
  }

  // Method to update deestination of order
  static updateOrder(req, res) {
    jwt.verify(req.headers['authorization'], 'AuthenticationKey', (err) => {
      if (err) {
        return res.status(403).send({ message: 'You have no authorization' });
      }
      const schema = Joi.object().keys({
        destination: Joi.string().trim().min(3).required(),
        senderId: Joi.number().min(1).required(),
      });
      Joi.validate(req.body, schema, async (error) => {
        if (error) {
          return res.status(400).send({ message: 'Wrong input' });
        }
        const sql = 'UPDATE orders SET destination = $1 WHERE id = $2 AND senderid = $3 RETURNING id';
        const data = [req.body.destination, req.params.id, req.body.senderId];

        const result = await execute(sql, data);
        if (result.rows.length !== 0) {
          const record = result.rows[0];
          return res.status(201).send({
            success: true, order: record,
          });
        }
        return res.status(400).send({ message: 'Failed to change the destination' });
      });
    });
  }

  static updateStatus(req, res) {
    jwt.verify(req.headers['authorization'], 'AuthenticationKey', (err) => {
      if (err) {
        return res.status(403).send({ message: 'You have no authorization' });
      }
      if (req.body.usertype !== 'admin') {
        return res.status(403).send({ message: 'Functionality reserved for admin' });
      }
      const schema = Joi.object().keys({
        status: Joi.string().trim().min(3).max(25)
          .required(),
        usertype: Joi.string().trim().required(),
      });
      Joi.validate(req.body, schema, async (error) => {
        if (error) {
          return res.status(400).send({ message: 'Wrong input' });
        }
        const sql = 'UPDATE orders SET status = $1 WHERE id = $2 RETURNING id';
        const data = [req.body.status, req.params.id];

        const result = await execute(sql, data);
        if (result.rows.length !== 0) {
          const record = result.rows[0];
          return res.status(201).send({
            success: true, order: record,
          });
        }
        return res.status(400).send({ message: 'Wrong Parcel ID' });
      });
    });
  }


  static updateLocation(req, res) {
    jwt.verify(req.headers['authorization'], 'AuthenticationKey', (err) => {
      if (err) {
        return res.status(403).send({ message: 'You have no authorization' });
      }
      if (req.body.usertype !== 'admin') {
        return res.status(403).send({ message: 'Functionality reserved for admin' });
      }
      const schema = Joi.object().keys({
        location: Joi.string().trim().min(3).max(25)
          .required(),
        usertype: Joi.string().trim().required(),
      });
      Joi.validate(req.body, schema, async (error) => {
        if (error) {
          return res.status(400).send({ message: 'Wrong input' });
        }
        const sql = 'UPDATE orders SET location = $1 WHERE id = $2 RETURNING id';
        const data = [req.body.location, req.params.id];

        const result = await execute(sql, data);
        if (result.rows.length !== 0) {
          const record = result.rows[0];
          return res.status(201).send({
            success: true, order: record,
          });
        }
        return res.status(400).send({ message: 'Wrong Parcel ID' });
      });
    });
  }
}

export default Orders;
