const path = require("path");

// //plugin instalado para manejo de html
// const HtmlWebPackPlugin = require("html-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const webpack = require("webpack");
const dotenv = require("dotenv");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

dotenv.config();
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  devtool: isProd ? "hidden-source-map" : "cheap-source-map",
  //le indicamos el entry point del proyecto
  entry: "./src/frontend/index.js",
  mode: process.env.NODE_ENV,
  //le indicamos el output que vamos a crear
  output: {
    //tomamos el path del directorio con __dirname
    //y le indicamos un directorio donde guardaremos los archivos
    path: isProd ? path.join(process.cwd(), "./src/server/public") : "/",
    //le indicamos el nombre del archivo principal
    filename: isProd ? "assets/app-[hash].js" : "assets/app.js",
    publicPath: "/"
  },
  //aca vamos a indicar las extensiones que utilizaremos en el proyecto
  resolve: {
    extensions: [".js", ".jsx"]
  },
  optimization: {
    minimizer: isProd ? [new TerserPlugin()] : [],
    splitChunks: {
      chunks: "async",
      name: true,
      cacheGroups: {
        vendors: {
          name: "vendors",
          chunks: "all",
          reuseExistingChunk: true,
          priority: 1,
          filename: isProd ? "assets/vendor-[hash].js" : "assets/vendor.js",
          enforce: true,
          test(module, chunks) {
            const name = module.nameForCondition && module.nameForCondition();
            return chunks.some(
              chunk =>
                chunk.name !== "vendor" && /[\\/]node_modules[\\/]/.test(name)
            );
          }
        }
      }
    }
  },
  module: {
    //indicamos todas las reglas para poder trabajar con nuestros archivos
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        enforce: "pre",
        use: {
          loader: "eslint-loader"
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              prependData: `
                @import "src/frontend/assets/styles/Vars.scss";
                @import "src/frontend/assets/styles/Media.scss";
                @import "src/frontend/assets/styles/Base.scss";
              `
            }
          }
        ]
      },
      {
        test: /\.(png|gif|jpg)$/,
        use: [
          {
            "loader": "file-loader",
            options: {
              name: "assets/[hash].[ext]"
            }
          }
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer(),
        ],
      },
    }),
    new MiniCssExtractPlugin({
      filename: isProd ? "assets/app-[hash].css" : "assets/app.css",
    }),
    (isProd
      ? (new CompressionPlugin({
          test: /\.js$|.css$/,
          filename: "[path].gz"
        }))
      : () => {}),
    isProd ? (new ManifestPlugin()) : () => {},
  ]
};