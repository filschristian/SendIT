import moment from 'moment';
import helpers from '../helpers';
import orders from '../models/orders';

class Orders {
  // Method to create an order
  static create(req, res) {
    if (!req.body.descr && !req.body.location && !req.body.destination
      && !req.body.quantity && !req.body.senderId) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    const price = helpers.calculatePrice(req.body.quantity);
    const newOrder = {
      id: orders.length + 1,
      descr: req.body.descr,
      location: req.body.location,
      destination: req.body.destination,
      quantity: req.body.quantity,
      price,
      orderDate: moment.now(),
      senderId: req.body.senderId,
    };
    orders.push(newOrder);
    return res.status(201).send(newOrder);
  }

  // method to fetch all parcels
  /* static fetchAll(req, res) {
    return res.status(200).send(orders);
  } */

  // method to fetch a specific order
  /*  static fetchOneOrder(req, res) {
     const order = orders.find(o => o.id === parseInt(req.params.id, 10));
     if (!order) {
       return res.status(404).send('Order not found');
     }
     return res.status(200).send(order);
   } */
}

export default Orders;
