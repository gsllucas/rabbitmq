import { getAMQPConnection } from './amqp-connection';
import { getConsumerPayload } from './utils/getConsumerPayload';

export async function createAMQPSystemLogsConsumer() {
  const connection = await getAMQPConnection();
  const channel = await connection.createChannel();
  channel.assertQueue('system_logs_queue');
  channel.consume('system_logs_queue', (payload) => {
    if (!payload) return;
    console.log('System logs queue payload', getConsumerPayload(payload));
    channel.ack(payload);
  });
}

createAMQPSystemLogsConsumer();
