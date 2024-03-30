import { getAMQPConnection } from './amqp-connection';

async function createAMQPProducer() {
  const connection = await getAMQPConnection();
  const channel = await connection.createChannel();
  const queueName = 'rabbitmq_queue';
  await channel.assertQueue(queueName, { durable: true });
  for (let i = 0; i <= 1000; i++) {
    const payload = { i };
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(payload)));
  }
}

createAMQPProducer();
