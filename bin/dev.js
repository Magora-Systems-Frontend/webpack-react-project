import _ from "lodash";
import path from "path";

const env = {
	API_URL: "",
	NODE_ENV: "development",
  WEB_PORT: "2017",
	PUBLIC_PATH: "/build/",
	SYSTEM_DATE_FORMAT: "YYYY-MM-DDTHH:mm:ss"
};

_.forEach(env, (value, key) => {
	if (!process.env[key]) {
		process.env[key] = value
	}
});

const app = require("../src/server/server").appCreator(process.env);

app.listen(app.get('port'), () => {
	console.log(`Dev server listening on port ${app.get('port')}`);
});
