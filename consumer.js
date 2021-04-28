var amqp = require("amqplib/callback_api");

var args = process.argv.slice(2);

if (args.length == 0) {
  console.log("Usage: consumer.js [number]");
  process.exit(1);
}

amqp.connect("amqp://localhost", function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }
    var exchange = "demo02";

    channel.assertExchange(exchange, "x-consistent-hash", {
      durable: true,
    });

    channel.prefetch(1);

    channel.assertQueue(
      "",
      {
        exclusive: true,
      },
      function (error2, q) {
        if (error2) {
          throw error2;
        }
        console.log(" [*] Waiting for logs. To exit press CTRL+C");

        args.forEach(function (severity) {
          channel.bindQueue(q.queue, exchange, severity);
        });

        channel.consume(
          q.queue,
          function (msg) {
            console.log(
              " [x] Received %s: '%s'",
              msg.fields.routingKey,
              msg.content.toString()
            );
            setTimeout(function () {
              console.log(" [x] Done with %s", msg.content.toString());
              channel.ack(msg);
            }, msg.content.toString() * 1000);
          },
          {
            noAck: false,
          }
        );
      }
    );
  });
});
