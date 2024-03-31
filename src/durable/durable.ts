import { getAMQPConnection } from '../amqp-connection';

export async function createDurableAMQPQueue() {
  const connection = await getAMQPConnection();
  const channel = await connection.createChannel();

  channel.assertQueue('durable_queue', { durable: true });
  channel.publish(
    '',
    'durable_queue',
    Buffer.from(
      'This payload message must be persisted even if container restarts'
    ),
    { persistent: true } // Persists the message in disk space even if the container is shutdown or restarted
  );
}

createDurableAMQPQueue();
