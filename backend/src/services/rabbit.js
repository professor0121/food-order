import amqp from 'amqplib';
import { ENV } from '../config/env.js';
const RABBITMQ_URL = ENV.RABBIT_URL;

let connection, channel;

async function connect() {

    connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');
}

async function subscribeToQueue(queueName, callback) {
    if (!channel) await connect();
    await channel.assertQueue(queueName);
    channel.consume(queueName, (message) => {
        callback(message.content.toString());
        channel.ack(message);
    });
}

async function publishToQueue(queueName, data) {
    if (!channel) await connect();
    await channel.assertQueue(queueName);
    channel.sendToQueue(queueName, Buffer.from(data));
}

export default {
    subscribeToQueue,
    publishToQueue,
    connect,
};