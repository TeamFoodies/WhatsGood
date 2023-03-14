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

const app = express();
app.use(express.json());
const PORT = 4000;

// Routes
app.use('/', index_route);
app.use('/create_account', create_account_route);
app.use('/login', login_route);
app.use('/restaurant', restaurant_route);
app.use('/logout', logout_route);
app.use('/review', review_route);
app.use('/user', user_route);
app.use('/favorite', favorite_route);

app.listen(PORT);
console.log(`Server running on port ${PORT}`);