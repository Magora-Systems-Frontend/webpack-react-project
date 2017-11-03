import webpack from "webpack";
import path from "path";
import CommonsChunkPlugin from "webpack/lib/optimize/CommonsChunkPlugin";
import ExtractTextPlugin from "extract-text-webpack-plugin";

const {NODE_ENV, API_URL, WEB_PORT, PUBLIC_PATH} = process.env;

console.log("client dev");
console.log("webpack env:");
console.log(`NODE_ENV ->  ${NODE_ENV}`);
console.log(`API_URL ->  ${API_URL}`);
console.log(`WEB_PORT ->  ${WEB_PORT}`);
console.log(`PUBLIC_PATH ->  ${PUBLIC_PATH}`);

const paths = {
	src: path.join(__dirname, '../src')
};

const desktopEntry = [
	`webpack-hot-middleware/client?http://0.0.0.0:${WEB_PORT}`,
	"babel-polyfill",
	"./desktop-entry.js"
];

const mobileEntry = [
  `webpack-hot-middleware/client?http://0.0.0.0:${WEB_PORT}`,
  "babel-polyfill",
  "./mobile-entry.js"
];

const plugins = [
	new webpack.DefinePlugin({
		"global.IS_BROWSER": true,
		'process.env': {
			NODE_ENV: JSON.stringify(process.env.NODE_ENV),
			API_URL: JSON.stringify(process.env.API_URL),
      WEB_PORT: JSON.stringify(process.env.WEB_PORT),
			SYSTEM_DATE_FORMAT: JSON.stringify(process.env.SYSTEM_DATE_FORMAT)
		}
	}),
	new CommonsChunkPlugin({
		filename: '[name].js',
		name: 'common-desktop',
		minChunks: Infinity,
    chunks: ['desktop']
	}),
	new CommonsChunkPlugin({
		filename: '[name].js',
		name: 'common-mobile',
		minChunks: Infinity,
    chunks: ['mobile']
	}),
  new ExtractTextPlugin({
    filename: '[name].css',
    allChunks: true
  }),
	new webpack.LoaderOptionsPlugin({
		test: /\.styl$/,
			stylus: {
				default: {
					import: [path.join(__dirname, "../src/theme/core/index.styl")],
          preferPathResolver: 'webpack'
				}
			}
	}),
  new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru|us/),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoEmitOnErrorsPlugin(),
  new webpack.optimize.ModuleConcatenationPlugin(),
];

const config = {
	context: paths.src,
	name: 'web',
  target: 'web',
	devtool: 'source-map',
	entry: {
		desktop: desktopEntry,
    mobile: mobileEntry
	},
	output: {
		filename: '[name].js',
    chunkFilename: '[name]-[id].bundle.js',
		publicPath: PUBLIC_PATH,
		path: PUBLIC_PATH,
    library: '[name]'
	},
	node: {
		net: 'empty',
		fs: 'empty'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
				  'babel-loader'
        ],
				exclude: /node_modules/
			}, {
				test: /\.(jade|pug)$/,
				use: [
					'pug-loader'
				],
				exclude: /node_modules/
			}, {
        test: /\.css$/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        }))
			}, {
				test: /\.styl$/,
				use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: "style-loader",
					use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
						"stylus-loader"
					]
				}))
			}, {
				test: /\.(jpe?g|png|gif|svg)$/i,
				loader: 'url-loader'
			}, {
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url-loader?name=/static/fonts/[name].[ext]?&limit=10000&minetype=application/font-woff',
			}, {
				test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'file-loader?name=/static/fonts/[name].[ext]',
			}, {
				test: /\.(svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'file-loader?name=/static/svg/[name].[ext]'
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx', '.styl']
	},
	plugins: plugins
};

export { config };
export default config;
