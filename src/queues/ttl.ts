import { getAMQPConnection } from '../amqp-connection';
import { toBuffer } from '../utils/toBuffer';

// Time to live (ttl) queues keeps the messages for a pre determined time
export async function createAMQPTTLQueue() {
  const connection = await getAMQPConnection();
  const channel = await connection.createChannel();

  channel.assertQueue('ttl_queue', { messageTtl: 10000 });
  channel.publish(
    '',
    'ttl_queue',
    toBuffer({ message: 'Time to live message with 10s' })
  );
}

createAMQPTTLQueue();
