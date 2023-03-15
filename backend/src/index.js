// Environment
require('dotenv').config();

// Initialize mongo connection - close application if no connection string specified
if (!require('./controllers/database.controller').mongo()) process.exit(1);

const express = require('express');

// Routes
const index_route = require('./routes/index.route');
const create_account_route = require('./routes/create_account.route');
const login_route = require('./routes/login.route');
const restaurant_route = require('./routes/restaurant.route');
const logout_route = require('./routes/logout.route');
const review_route = require('./routes/review.route');
const user_route = require('./routes/user.route');
const favorite_route = require('./routes/favorite.route');
const menu_route = require('./routes/menu.route');

const app = express();
app.use(express.json());
const PORT = 4000;

// Routes
app.use('/', index_route);
app.use('/create_account', create_account_route.router);
app.use('/login', login_route.router);
app.use('/restaurant', restaurant_route.router);
app.use('/logout', logout_route.router);
app.use('/review', review_route.router);
app.use('/user', user_route.router);
app.use('/favorite', favorite_route.router);
app.use('/menu', menu_route);

app.listen(PORT);
console.log(`Server running on port ${PORT}`);