df.socket = (function() {
  var message = {},
      host;

  df.subscribe("ready", function() {
    var socket = io.connect(df.config.socketconf.host, {
      'port': df.config.socketconf.port,
      'max reconnection attempts': 50
    });

    socket.on("connect", function() {
      df.publish("socket:clientId", socket.id);
    });

    socket.on("reconnect", function() {
      df.publish("socket:clientId", socket.id);
    });

    socket.on("message", function(msg) {
      !df.config.production && console.log("message: " + JSON.stringify(msg));

      if (JSON.stringify(msg) === JSON.stringify(message)) { return; }
      message = msg;

      if (host !== message.host) {
        host = message.host;
        df.publish("socket:host", host);
      }

      df.publish("socket:message", message);
    });

    df.subscribe("socket:event", function(event, data) {
      socket.json.send({
        event: event,
        data: data
      });
    });
  });

  return {};
})();

