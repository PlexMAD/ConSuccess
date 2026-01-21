import path, { dirname } from "path";

import { type Configuration } from "webpack";
import { type Configuration as DevServerConfiguration } from "webpack-dev-server";

import HtmlWebpackPlugin from "html-webpack-plugin";
import { EnvVariables } from "./config/types/types";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = (env: EnvVariables): Configuration => {
  const isDev = env?.mode === "development";

  return {
    node: {
      __filename: "mock",
      __dirname: "mock",
    },

    mode: isDev ? "development" : "production",

    entry: path.resolve(__dirname, "src", "index.tsx"),

    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      clean: true,
    },

    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
      }),
    ],

    devServer: {
      static: {
        directory: path.resolve(__dirname, "public"),
      },
      port: 3000,
      open: true,
      hot: true,
      historyApiFallback: true,
    },

    devtool: isDev ? "source-map" : false,
  };
};

export default config;
