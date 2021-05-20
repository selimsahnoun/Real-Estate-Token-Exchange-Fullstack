require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_NAME}.x9fs5.mongodb.net/${process.env.DB_NAME}`;

const mongoose = require('mongoose');

mongoose
	.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('successfully connected to database'))
	.catch(console.log);

const db = mongoose.connection;

module.exports = db;
