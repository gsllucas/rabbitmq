import { getAMQPConnection } from './amqp-connection';
import { toBuffer } from './utils/toBuffer';

export async function createAMQPTopicExchange() {
  const connection = await getAMQPConnection();
  const channel = await connection.createChannel();

  channel.assertExchange('topic_exchange', 'topic', { durable: true });
  channel.assertQueue('system_logs_queue', { durable: true });

  const routingKeyPattern = 'system.#';
  channel.bindQueue('system_logs_queue', 'topic_exchange', routingKeyPattern);

  const errorLogPayload = toBuffer({ message: 'Error log' });
  const successLogPayload = toBuffer(
    JSON.stringify({ message: 'Success log' })
  );

  channel.publish('topic_exchange', 'system.logs.error', errorLogPayload);
  channel.publish('topic_exchange', 'system.logs.success', successLogPayload);

  console.log('Topic exchange started and published message');
}

createAMQPTopicExchange();
