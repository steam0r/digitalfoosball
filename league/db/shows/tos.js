function(doc, req) {
  var mustache = require("lib/mustache"),
      template = this.templates["tos.html"],
      config = this.config,
      locales = this.resources["locales_" + config.locale],
      data = [];

  for (var key in locales) {
    data["locales." + key] = locales[key];
  }

  return {
    body: mustache.to_html(template, data)
  };
};
