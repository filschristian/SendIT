import express from 'express';

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

server.get('/', (req, res) => {
  return res.status(200).send({ message: 'YAY! Congratulations! Your first endpoint is working' });
});

server.listen(PORT, () => {
  console.log(`server listening on port: ${PORT}`);
});
