import express from "express";
import webpack from 'webpack';
import helmet from 'helmet';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import boom from '@hapi/boom';
import cookieParser from 'cookie-parser';
import axios from 'axios';
import main from './routes/main';
import { config } from './config/index';

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static(`${__dirname}/public`));

//implementando la session para twitter
app.use(session({ secret: config.sessionSecret }));

//utilizamos initialize y session para twitter
app.use(passport.initialize());
app.use(passport.session());

//strategies
require("./utils/auth/strategies/basic");
require("./utils/auth/strategies/oauth");
require("./utils/auth/strategies/google");
require("./utils/auth/strategies/twitter");


if (ENV === 'development') {
  console.log('Loading dev config');
  const webpackConfig = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const serverConfig = {
    contentBase: `http://localhost:${PORT}`,
    port: PORT,
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: { colors: true }
  };
  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));
} else {
  console.log(`Loading ${ENV} config`);
  app.use(helmet());
  app.use(cors());
  app.use(helmet.permittedCrossDomainPolicies());
  app.disable('x-powered-by');
}

app.post("/auth/sign-in", async function(req, res, next) {
  passport.authenticate("basic", (error, data) => {
    try {
      if (error || !data) {
        next(boom.unauthorized());
      }

      //si todo sale bien
      //hacemos el login
      req.login(data, { session: false }, async error => {
        if (error) next(error);

        const { ...user } = data;

        // res.cookie("token", token, {
        //   httpOnly: !config.dev,
        //   secure: !config.dev
        // });

        res.status(200).json(user);
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
});

app.post("/auth/sign-up", async function(req, res, next) {
  const { body: user } = req;
  console.log(`url:      ${JSON.stringify(user)}`);
  try {
    await axios({
      url: `${config.apiUrl}/api/auth/sign-up`,
      method: "post",
      data: user
    });

    console.log('here');

    res.status(201).json({ message: "User created" });
  } catch (error) {
    next(error);
  }
});

app.get("*", main);

app.listen(PORT, err => {
  if (err) console.log(err);
  console.log(`Server running on port ${PORT}`);
});
