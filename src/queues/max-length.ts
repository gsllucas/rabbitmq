import { getAMQPConnection } from '../amqp-connection';
import { getConsumerPayload } from '../utils/getConsumerPayload';
import { toBuffer } from '../utils/toBuffer';
import { sleep } from '../utils/sleep';

// Max length queues only permits messages according to the maxLength value
export async function createAMQPMaxLengthQueue() {
  const connection = await getAMQPConnection();
  const channel = await connection.createChannel();

  await channel.assertQueue('max_length_queue', { maxLength: 1000 });

  for (let i = 0; i < 5000; i++) {
    channel.publish('', 'max_length_queue', toBuffer({ message: i }));
  }

  await channel.consume('max_length_queue', async (payload) => {
    if (!payload) return;
    const payloadData = getConsumerPayload(payload);
    console.log('index - ' + payloadData.message);
    await sleep();
    channel.ack(payload);
  });
}

createAMQPMaxLengthQueue();
