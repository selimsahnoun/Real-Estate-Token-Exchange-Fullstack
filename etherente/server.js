//------Server----------------------------------//
require('dotenv').config();
const express = require('express');
const PORT = 8081 || process.env.PORT;
const app = express();
//------Routes----------------------------------//
const user = require('./backend/routes/user');
const house = require('./backend/routes/house');
const { HousesList } = require('./housesList.json');
//------DB activation---------------------------//
const db = require('./backend/database/index');
//------Parsers---------------------------------//
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/dist'));

app.use('/user', user);
app.use('/house', house);
app.get('/houseslist', (req, res) => {
	res.send(HousesList);
});
app.get('/houseslist/:id', (req, res) => {
	res.send(HousesList[parseInt(req.params.id) - 1]);
});
app.get(/.*/, function(req, res) {
	res.sendFile(__dirname + '/dist/index.html');
});

app.listen(PORT);

console.log(`App running at:\n http://localhost:${PORT}/`);
