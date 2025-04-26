const express = require('express');
const app = express();
const mongoose = require('mongoose');
const user_router = require('./routers/users');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const errorHandler = require('./utils/handle_error');
const verifyToken = require('./utils/verify_token');

require('dotenv').config();

app.use(cors());


//Middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(errorHandler);
// app.use(verifyToken());
app.use(express.static('public'));


//Routes
app.use('/users', user_router);




//MongoDB connection
mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING)
.then(() => {
    console.log('MongoDB connection success');
})
.catch((err) => {
    console.log(err)
});



app.listen(process.env.PORT, () =>
 console.log(`Server listening on ${process.env.PORT}`));