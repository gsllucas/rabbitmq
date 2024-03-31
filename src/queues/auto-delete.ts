import { getAMQPConnection } from '../amqp-connection';
import { toBuffer } from '../utils/toBuffer';

// Auto delete queues does not long exists when the last consumer is disconnected
export async function createAQMPAutoDeleteQueue() {
  const connection = await getAMQPConnection();
  const channel = await connection.createChannel();

  channel.assertQueue('auto_delete_queue', { autoDelete: true });

  channel.publish(
    '',
    'auto_delete_queue',
    toBuffer({ message: 'Time to live message with 10s' })
  );
}

createAQMPAutoDeleteQueue();
