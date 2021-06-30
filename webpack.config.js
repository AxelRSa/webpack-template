const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const mode = process.env.NODE_ENV || "development";
const path = require("path");

module_config = (entry = "./src/index.js", output_path = "dist", html_template = "./src/index.pug") => {

	const config = {
		mode: mode,
		entry: entry,
		devtool: mode == "production" ? false : "source-map",
		target: mode == "production" ? "browserslist" : "web",
		devServer: { contentBase: "./dist" },
		output: {
			filename: mode === "production" ? "script.[hash].js" : "script.js",
			path: path.resolve(__dirname, output_path),
			clean: mode === "production" ? true : false,
		},
		module: {
			rules: [
				{
					test: /\.(jpe?g|png|gif|svg|webp)$/i,
					type: "asset",
					generator: {
						filename: `media/images/[name]${mode === "production" ? "[hash]" : ""}[ext]`,
					},
				},
				{
					test: /\.(eot|svg|ttf|woff|woff2)$/i,
					type: "asset",
					generator: {
						filename: `media/fonts/[name]${mode === "production" ? "[hash]" : ""}[ext]`,
					},
				},
				{
					test: /\.scss$/i,
					use: [
						mode === "production"
							? MiniCssExtractPlugin.loader
							: "style-loader",
						"css-loader",
						mode === "prodcution" ? "postcss-loader" :
							"sass-loader",
					],
				},
				{
					test: /\.pug$/i,
					use: ["html-loader", "pug-html-loader"],
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
					},
				},
			],
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: html_template,
				filename: "index.html",
				inject: "body",
			}),
			new MiniCssExtractPlugin({ filename: "styles.[hash].css" }),
		],
	}

	return config
}




module.exports = [
	module_config(),
];
