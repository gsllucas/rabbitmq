import { getAMQPConnection } from '../amqp-connection';
import { getConsumerPayload } from '../utils/getConsumerPayload';
import { sleep } from '../utils/sleep';
import { randomUUID } from 'crypto';
import { toBuffer } from '../utils/toBuffer';

// Exclusive queue, it allows to consume messages with only the same declared channel
export async function createAMQPExclusiveQueue() {
  const connection = await getAMQPConnection();
  const channel = await connection.createChannel();

  channel.assertQueue('exclusive_queue', { exclusive: true });

  channel.prefetch(5);

  channel.consume('exclusive_queue', async (payload) => {
    if (!payload) return;
    const parsedPayload = getConsumerPayload(payload);
    console.log(`${parsedPayload.message} = ${parsedPayload.i}`);
    await sleep();
    channel.ack(payload);
  });

  for (let i = 1; i <= 50; i++) {
    channel.publish(
      '',
      'exclusive_queue',
      toBuffer({
        message: 'Message of an exclusive queue',
        type: 'exclusive',
        i,
      })
    );
  }
}

createAMQPExclusiveQueue();
