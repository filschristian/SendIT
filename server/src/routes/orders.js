import express from 'express';
import Orders from '../controllers/orders';
import Users from '../controllers/users';
import middlewares from '../middlewares/';

const router = express.Router();
router.use(express.json());

// orders routes
router.post('/api/v1/parcels/', Orders.create);
router.get('/api/v1/parcels/', Orders.fetchAll);
router.get('/api/v1/parcels/:id', Orders.fetchOneOrder);
router.put('/api/v1/parcels/:id/cancel', Orders.cancelOrder);
router.delete('/api/v1/parcels/:id', Orders.deleteOrder);
router.put('/api/v1/parcels/:id/destination', Orders.updateOrder);

// Users routes
router.get('/api/v1/users/', Users.fetchAll);
router.get('/api/v1/users/:id', Users.fetchOneUser);
router.get('/api/v1/users/:id/parcels', Users.fetchOrders);

// Authentication
router.post('/api/v1/auth/signup', Users.create);
router.post('/api/v1/auth/login', Users.logIn);

export default router;
