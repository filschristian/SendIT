import express from 'express';
import dotenv from 'dotenv';
import router from './routes/orders';

// Making environment variables available
dotenv.config();

// setting server to express framework
const server = express();

// Allow receive of JSON data
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(router);

// Set port
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`server listening on port: ${PORT}`);
});
export default server;
