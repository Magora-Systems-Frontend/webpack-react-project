import webpack from "webpack";
import path from "path";
import fs from "fs";
import CopyWebpackPlugin from "copy-webpack-plugin";

const {NODE_ENV, API_URL, WEB_PORT, PUBLIC_PATH} = process.env;

console.log("server");
console.log("webpack env:");
console.log(`NODE_ENV ->  ${NODE_ENV}`);
console.log(`PUBLIC_PATH ->  ${PUBLIC_PATH}`);
console.log(`API_URL ->  ${API_URL}`);
console.log(`WEB_PORT ->  ${WEB_PORT}`);

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

const plugins = [
  new webpack.DefinePlugin({
    "global.IS_BROWSER": false,
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV),
      API_URL: JSON.stringify(API_URL),
      WEB_PORT: JSON.stringify(WEB_PORT),
      PUBLIC_PATH: JSON.stringify(PUBLIC_PATH)
    }
  }),
  new webpack.BannerPlugin({banner: 'require("source-map-support").install();', raw: true, entryOnly: false}),
  new webpack.IgnorePlugin(/\.(css|styl)$/),
  new CopyWebpackPlugin([
    { from: 'templates', to: path.join(PUBLIC_PATH, "templates") }
  ])
];

const config = {
  context: path.join(__dirname, '../src/server'),
  devtool: 'sourcemap',
  name: 'node',
  target: 'node',
  entry: [
    "babel-polyfill",
    "./server.js"
  ],
  output: {
    filename: 'index.js',
    publicPath: PUBLIC_PATH,
    path: PUBLIC_PATH,
    chunkFilename: 'client-chunk/[name]-[id].bundle.js',
    library: 'server',
    libraryTarget: "umd"
  },
  node: {
    net: 'empty',
    fs: "empty"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ],
        exclude: /node_modules/
      }
    ]
  },
  externals: nodeModules,
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: plugins
};

export { config };
export default config;
