import express from 'express';
import router from './routes/orders';


const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(router);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`server listening on port: ${PORT}`);
});
export default server;
