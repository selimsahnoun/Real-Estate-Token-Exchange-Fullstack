//------Server----------------------------------//
require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 8081;
const app = express();
//------Routes----------------------------------//
const user = require('./backend/routes/user');
const house = require('./backend/routes/house');
const transaction = require('./backend/routes/transaction');
//------DB activation---------------------------//
const db = require('./backend/database/index');
//------Parsers---------------------------------//
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/dist'));
//------Routes Activation----------------------------------//
app.use('/user', user);
app.use('/house', house);
app.use('/transaction', transaction);
//------False URL Rerouting----------------------------------//
app.get(/.*/, function(req, res) {
	res.sendFile(__dirname + '/dist/index.html');
});
//------App listening----------------------------------//
app.listen(PORT);

console.log(`App running at:\n http://localhost:${PORT}/`);
