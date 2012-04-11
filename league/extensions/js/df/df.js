/**
 *
 *  .oooooo..o ooooo ooooo      ooo ooooo      ooo oooooooooooo ooooooooo.    .oooooo..o   .oooooo.   ooooo   ooooo ooooooooo.         .o.       oooooooooo.   oooooooooooo ooooooooo.
 * d8P'    `Y8 `888' `888b.     `8' `888b.     `8' `888'     `8 `888   `Y88. d8P'    `Y8  d8P'  `Y8b  `888'   `888' `888   `Y88.      .888.      `888'   `Y8b  `888'     `8 `888   `Y88.
 * Y88bo.       888   8 `88b.    8   8 `88b.    8   888          888   .d88' Y88bo.      888           888     888   888   .d88'     .8"888.      888      888  888          888   .d88'
 *  `"Y8888o.   888   8   `88b.  8   8   `88b.  8   888oooo8     888ooo88P'   `"Y8888o.  888           888ooooo888   888ooo88P'     .8' `888.     888      888  888oooo8     888ooo88P'
 *      `"Y88b  888   8     `88b.8   8     `88b.8   888    "     888`88b.         `"Y88b 888           888     888   888`88b.      .88ooo8888.    888      888  888    "     888`88b.
 * oo     .d8P  888   8       `888   8       `888   888       o  888  `88b.  oo     .d8P `88b    ooo   888     888   888  `88b.   .8'     `888.   888     d88'  888       o  888  `88b.
 * 8""88888P'  o888o o8o        `8  o8o        `8  o888ooooood8 o888o  o888o 8""88888P'   `Y8bood8P'  o888o   o888o o888o  o888o o88o     o8888o o888bood8P'   o888ooooood8 o888o  o888o
 *
 * YOU ENJOY WORKING ON INNOVATIVE PROJECTS? PLEASE CONTACT KATHY REINECKE: jobs@sinnerschrader.com // WE ARE LOOKIG FORWARD TO HEARING FROM YOU!
 * SinnerSchrader Deutschland GmbH, Völckersstraße 38, 22765 Hamburg
 *
 */

if (typeof console === "undefined") {
  console = {
    log: function() {},
    debug: function() {}
  };
}

df = (function(df) {
  var subscriptions = {};
  var subscribe = function(events, cb, once) {
    events.replace(/(\s)\s*/g, "$1").split(" ").forEach(function(e) {
      subscriptions[e] || (subscriptions[e] = []);
      subscriptions[e].push({ cb: cb, once: once });
    });
  };

  df.subscribe = function(e, cb) {
    subscribe(e, cb, false);
  };

  df.subscribeOnce = function(e, cb) {
    subscribe(e, cb, true);
  };

  df.publish = function(events) {
    var args = Array.prototype.slice.call(arguments, 1);
    events.replace(/(\s)\s*/g, "$1").split(" ").forEach(function(e) {
      subscriptions[e] && subscriptions[e].forEach(function(obj, index) {
        obj.cb && obj.cb.apply(this, args);
        obj.once && subscriptions[e].splice(index, 1);
      });
    });
  };

  return df;
})(typeof df === "undefined" ? {} : df);

$(document).ready(function() {
  df.publish("ready");
});

