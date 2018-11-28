import Joi from 'joi';
import jwt from 'jsonwebtoken';
import helpers from '../helpers';
import orders from '../models/orders';
import execute from '../db/index';

class Orders {
  // Method to create an order
  static create(req, res) {
    const schema = Joi.object().keys({
      descr: Joi.string().trim().required(),
      location: Joi.string().trim().required(),
      destination: Joi.string().trim().required(),
      quantity: Joi.number().required(),
      senderId: Joi.number().required(),
      status: Joi.string().trim().required(),
    });
    Joi.validate(req.body, schema, (err) => {
      if (err) {
        return res.status(403).send({ message: 'Wrong format of data' });
      }
      const price = helpers.calculatePrice(req.body.quantity);
      const date = new Date().toDateString();
      const newOrder = {
        id: orders.length + 1,
        descr: req.body.descr,
        location: req.body.location,
        destination: req.body.destination,
        quantity: req.body.quantity,
        price,
        orderDate: date,
        senderId: parseInt(req.body.senderId, 10),
        status: req.body.status,
      };
      orders.push(newOrder);
      return res.status(201).send(newOrder);
    });
  }

  // method to fetch all parcels
  static fetchAll(req, res) {
    return res.status(200).send(orders);
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

  // Method to update order
  static updateOrder(req, res) {
    jwt.verify(req.headers['authorization'], 'AuthenticationKey', (err) => {
      if (err) {
        return res.status(403).send('You have no authorization ');
      }
      const order = orders.find(o => o.id === parseInt(req.params.id, 10));
      if (!order) {
        return res.status(404).send('order not found');
      }
      if (parseInt(req.body.senderId, 10) !== order.id) {
        return res.status(403).send('You dont have access to this order');
      }
      order.destination = req.body.destination;
      return res.json({ order });
    });
  }
}

export default Orders;
