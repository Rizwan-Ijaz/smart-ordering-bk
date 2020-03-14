const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors');
const routes = require('./routes/index.routes');


const app = express();
const mongoDB = 'mongodb://127.0.0.1/smartOrdering';
const SERVER_PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use(cors());
app.use('/', routes);
app.use(express.static('uploads'));

mongoose.connect(mongoDB, {useNewUrlParser: true});
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function () {
    console.log('Database is connected');
    app.listen(SERVER_PORT, () => {
        console.log('Server is running at PORT: ', SERVER_PORT);
    });
});
