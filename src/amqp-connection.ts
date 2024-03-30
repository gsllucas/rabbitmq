import amqp from 'amqplib';
import { environments } from './config/environments';

export async function getAMQPConnection() {
  const { AMQP_HOST, AMQP_PORT, AMQP_PASSWORD, AMQP_USER } = environments.local;
  const connection = await amqp.connect({
    hostname: AMQP_HOST,
    port: AMQP_PORT,
    username: AMQP_PASSWORD,
    password: AMQP_USER,
  });
  return connection;
}
