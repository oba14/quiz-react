const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200)
    .json({
        message: 'This is quiz server'
    })
})

app.listen(port, `app is listening to port, ${port}`)