import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGNDATABASE,
  port: process.env.PGPORT,
  password: process.env.PGPASSWORD,
});

const connect = async () => pool.connect();

const execute = async (sql, data = []) => {
  const connection = await connect();
  try {
    return await connection.query(sql, data);
  } catch (error) {
    return error.message;

  } finally {
    connection.release();
  }
};
export default execute;
