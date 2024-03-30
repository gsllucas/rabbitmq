import { ConsumeMessage } from 'amqplib';

export function getConsumerPayload(consumerPayload: ConsumeMessage) {
  return JSON.parse(consumerPayload.content.toString());
}
