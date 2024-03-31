import { getAMQPConnection } from './amqp-connection';
import { asBuffer } from './utils/asBuffer';

export async function createAMQPExchange() {
  const connection = await getAMQPConnection();
  const channel = await connection.createChannel();
  await channel.assertExchange('rabbitmq_exchange', 'direct');
  await channel.assertQueue('notification_queue');
  // vincular uma fila a uma exchange através de uma routing key
  const bindedQueue = {
    queue: 'notification_queue',
    exchange: 'rabbitmq_exchange',
    routingKey: 'notification_queue_key',
  };
  await channel.bindQueue(
    bindedQueue.queue,
    bindedQueue.exchange,
    bindedQueue.routingKey
  );
  channel.publish(
    bindedQueue.exchange,
    bindedQueue.routingKey,
    asBuffer(JSON.stringify({ message: 'Payload sent from an exchange' }))
  );
}

createAMQPExchange();
