const amqp = require("amqplib");
const exchangeName = "headersMessage"
const receiveData = async () => {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, "headers");
    const assertedQueue = await channel.assertQueue('', {exclusive: true});
    channel.bindQueue(assertedQueue.queue, exchangeName, '', {author: "erfan", runtime: "nodejs", 'x-match' : 'any'});
    channel.consume(assertedQueue.queue, msg => {
        console.log(msg.content.toString());
        console.log(msg.properties.headers);
    })
}
receiveData();