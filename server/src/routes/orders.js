import express from 'express';
import Orders from '../controllers/orders';
import Users from '../controllers/users';


const router = express.Router();
router.use(express.json());

// orders routes
// Create a parcel
router.post('/api/v1/parcels/', Orders.create);
// Fetch all parcel
router.get('/api/v1/parcels/', Orders.fetchAll);
// fetch one parcel
router.get('/api/v1/parcels/:id', Orders.fetchOneOrder);
// cancel an order
router.put('/api/v1/parcels/:id/cancel', Orders.cancelOrder);
//Delete an order
router.delete('/api/v1/parcels/:id', Orders.deleteOrder);

// Users routes
router.get('/api/v1/users/', Users.fetchAll);
router.get('/api/v1/users/:id', Users.fetchOneUser);
//fetch all orders of a user
router.get('/api/v1/users/:id/parcels', Users.fetchOrders);

// Challenge 3
// JWT stuffs
// change destination
router.put('/api/v1/parcels/:id/destination', Orders.updateOrder);

// Authentication
router.post('/api/v1/auth/signup', Users.create);
router.post('/api/v1/auth/login', Users.logIn);

export default router;
