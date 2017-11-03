var _ = require("lodash");
var path = require("path");

var env = {
  API_URL: "",
  NODE_ENV: "production",
  WEB_PORT: 8081,
  PUBLIC_PATH: path.join(__dirname, "../build/client"),
  TEMPLATE_PATH: path.join(__dirname, "../build/server/templates"),
  STATIC_PATH: path.join(__dirname, "../static"),
  SYSTEM_DATE_FORMAT: "YYYY-MM-DDTHH:mm:ss"
};

_.forEach(env, (value, key) => {
  if (!process.env[key]) {
    process.env[key] = value
  }
});

var app = require("../build/server").appCreator(process.env);

app.listen(app.get('port'), 'localhost', () => {
  console.log("Prod server listening on port " + app.get('port'));
});
