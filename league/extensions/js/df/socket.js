df.socket = (function() {
  var message = {};
  
  df.subscribe("ready", function() {
    var socket = io.connect(df.config.socketconf.host, {
      'port': df.config.socketconf.port,
      'max reconnection attempts': 50
    });

    socket.on("message", function(msg) {
      if (JSON.stringify(msg) === JSON.stringify(message)) { return; }
      message = msg;

      df.publish("socket:message", message);
    });
  });

  return {};
})();

