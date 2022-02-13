const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFilenameHelpers } = require("webpack");

module.exports = {
	entry: path.resolve(__dirname, "src", "index.tsx"),
	output: {
		filename: "bundle.[contenthash].js",
		path: path.resolve(__dirname, "dist"),
		publicPath: "/",
	},
	devtool: "source-map",
	mode: "development",
	resolve: {
		preferRelative: true,
		extensions: [".js", ".ts", ".tsx"],
		alias: {
			Auth: path.resolve(process.cwd(), "src/Auth/"),
			Components: path.resolve(process.cwd(), "src/Components/"),
			Redux: path.resolve(process.cwd(), "src/Redux/"),
			Types: path.resolve(process.cwd(), "src/Types/"),
		},
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: ["ts-loader"],
			},
			{
				test: /\.html/,
				use: ["html-loader"],
			},
			{
				test: /\.scss$/,
				use: [
					{ loader: "style-loader" },
					{ loader: "css-loader" },
					{ loader: "resolve-url-loader" },
					{ loader: "sass-loader" },
				],
			},
			{
				test: /\.(png|svg|gif|pdf|ico|jpg)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
						},
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "public", "index.html"),
		}),
	],
	devServer: {
		static: path.resolve(__dirname, "dist"),
		port: 3333,
		historyApiFallback: true,
	},
};
