const amqp = require('amqplib');

class RabbitMQService {
  constructor() {
    this.connection = null;
    this.channel = null;
  }

  async connect() {
    const amqpServer = process.env.RABBITMQ_URL;
    this.connection = await amqp.connect(amqpServer);
    this.channel = await this.connection.createChannel();
  }

 /**
  * Publish message to the specified queue
  * @param {String} queueName
  * @param {String} message
  */
  async publishMessage(queueName, message) {
    await this.channel.assertQueue(queueName, { durable: true });
    this.channel.sendToQueue(queueName, Buffer.from(message));
  }

  /**
   * Consume messages from the specified queue
   * @param {String} queueName
   * @param {Function} callback
   */
  async consumeMessage(queueName, callback) {
    await this.channel.assertQueue(queueName);
    this.channel.consume(queueName, (msg) => {
      if (msg !== null) {
        const content = msg.content.toString();
        callback(content);
      }
    }, { noAck: true });
  }

  /**
   * Close the connection to the RabbitMQ server
   */
  async closeConnection() {
    await this.connection.close();
  }
}

module.exports = new RabbitMQService();
