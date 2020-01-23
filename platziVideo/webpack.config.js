const path = require("path");

//plugin instalado para manejo de html
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  //le indicamos el entry point del proyecto
  entry: "./src/index.js",
  //le indicamos el output que vamos a crear
  output: {
    //tomamos el path del directorio con __dirname
    //y le indicamos un directorio donde guardaremos los archivos
    path: path.resolve(__dirname, "dist"),
    //le indicamos el nombre del archivo principal
    filename: "bundle.js"
  },
  //aca vamos a indicar las extensiones que utilizaremos en el proyecto
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    //indicamos todas las reglas para poder trabajar con nuestros archivos
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader"
        }
      },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(png|gif|jpg)$/,
        use: [
          {
            loader: "file-loader",
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
    new HtmlWebPackPlugin({
      //le indicamos de donde va a tomar el template
      //y el nombre del archivo que creara
      template: "./public/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "assets/[name].css"
    })
  ]
};
