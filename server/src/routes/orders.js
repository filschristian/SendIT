import express from 'express';
import Orders from '../controllers/orders';

const router = express.Router();
router.use(express.json());

router.post('/api/v1/parcels/', Orders.create);
router.get('/api/v1/parcels/', Orders.fetchAll);
/* router.get('/api/v1/parcels/:id', Orders.fetchOneOrder); */
export default router;
