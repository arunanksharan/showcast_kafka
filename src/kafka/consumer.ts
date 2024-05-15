import { Kafka, logLevel } from 'kafkajs';
import { assignRoom } from '../room/assign';

const kafka = new Kafka({
  brokers: ['internal-heron-13399-us1-kafka.upstash.io:9092'],
  ssl: true,
  sasl: {
    mechanism: 'scram-sha-256',
    username: 'aW50ZXJuYWwtaGVyb24tMTMzOTkkAEZkQlNxthTrHwirAry3R6XVSr4JohWg3e4',
    password: 'YTU4MGEyN2ItMDdiOS00ZTFlLThkMGEtOTU4NjY4ZTNiZTUx',
  },
  logLevel: logLevel.ERROR,
});

const consumer = kafka.consumer({ groupId: 'internal-heron' });

export const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'users-for-room', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value?.toString(),
      });
      console.log('Message received by consumer, line 27');
      const roomId: string | null = message.value?.toString() || null;
      if (roomId !== null) {
        await assignRoom(roomId);
      }
    },
  });
};

// run().catch((e) => console.error('[example/consumer] e.message', e));
