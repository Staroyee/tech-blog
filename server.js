// SERVER

// IMPORT DEPENDANCIES
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const routes = require('./controllers');
const path = require('path');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers});

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// DEFINE APP AND PORT
const app = express();
const PORT = process.env.PORT || 3001;

// HANDLEBARS SETUP
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// SEQUELIZE SESSION SETUP
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// USE FUNCTIONS
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

// SEQUELIZE SERVER START
sequelize.sync({ force: false }).then(() => {
  app.listen(process.env.PORT ||3001, () => console.log('Now listening'));
});