import express from 'express';
import Orders from '../controllers/orders';
import Users from '../controllers/users';

const router = express.Router();
router.use(express.json());

// orders routes
router.post('/api/v1/parcels/', Orders.create);
router.get('/api/v1/parcels/', Orders.fetchAll);
router.get('/api/v1/parcels/:id', Orders.fetchOneOrder);
router.put('/api/v1/parcels/:id/cancel', Orders.cancelOrder);
router.delete('/api/v1/parcels/:id', Orders.deleteOrder);
router.put('/api/v1/parcels/:id', Orders.updateOrder);

// Users routes
router.post('/api/v1/users/', Users.create);
router.get('/api/v1/users/', Users.fetchAll);
router.get('/api/v1/users/:id', Users.fetchOneUser);
router.get('/api/v1/users/:id/parcels', Users.fetchOrders);
export default router;
