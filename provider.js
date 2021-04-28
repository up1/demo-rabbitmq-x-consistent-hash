var amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }
    var exchange = "demo02";
    var args = process.argv.slice(2);
    var msg = args.slice(1).join(" ") || "Hello World!";
    var username = args.length > 0 ? args[0] : "user1";

    // Mapping user to queue

    channel.assertExchange(exchange, "x-consistent-hash", {
      durable: true,
    });
    channel.publish(exchange, username, Buffer.from(msg));
    console.log(" [x] Sent %s: '%s'", username, msg);
  });

  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 500);
});
