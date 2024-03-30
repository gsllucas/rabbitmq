import { getAMQPConnection } from './amqp-connection';
import { getConsumerPayload } from './utils/getConsumerPayload';
import { sleep } from './utils/sleep';

export async function createAMQPConsumer() {
  const connection = await getAMQPConnection();
  const channel = await connection.createChannel();
  await channel.assertQueue('rabbitmq_queue', { durable: true });
  await channel.prefetch(15);
  channel.consume('rabbitmq_queue', async (payload) => {
    if (!payload) return;
    console.log(getConsumerPayload(payload));
    await sleep();
    channel.ack(payload!);
  });
}

createAMQPConsumer();
