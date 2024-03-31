import { getAMQPConnection } from '../amqp-connection';
import { toBuffer } from '../utils/toBuffer';

export async function createAMQPMaxPriorityQueue() {
  const connection = await getAMQPConnection();
  const channel = await connection.createChannel();
  channel.assertQueue('priority_queue', { durable: true, maxPriority: 2 });

  // for (let i = 0; i < 10; i++) {
  //   channel.sendToQueue(
  //     'priority_queue',
  //     toBuffer({
  //       message: `(${i}) This message has no priority`,
  //       priority: null,
  //     })
  //   );
  // }

  channel.publish(
    '',
    'priority_queue',
    Buffer.from(
      JSON.stringify({ message: 'This message priority is 2', priority: 2 })
    ),
    { priority: 2 }
  );
}

createAMQPMaxPriorityQueue();
