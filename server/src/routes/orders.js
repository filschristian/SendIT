import express from 'express';
import Orders from '../controllers/orders';

const router = express.Router();
router.use(express.json());

router.post('/api/v1/parcels/', Orders.create);
router.get('/api/v1/parcels/', Orders.fetchAll);
router.get('/api/v1/parcels/:id', Orders.fetchOneOrder);
router.put('/api/v1/parcels/:id/cancel', Orders.cancelOrder);
router.delete('/api/v1/parcels/:id', Orders.deleteOrder);
router.put('/api/v1/parcels/:id', Orders.updateOrder);

export default router;
