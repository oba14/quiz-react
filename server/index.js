const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 5000;
const url = process.env.URL;
const fetch = require('node-fetch');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));

app.get('/', (req, res) => {
    res.status(200)
    .json({
        message: 'This is quiz server'
    })
})

app.post('/quiz', (req,res) => {
    if(!req.body){
        res.status(404).json({message: 'All details were not provided'})
    }
    // console.log(req);
    try {
        fetch(`${url}amount=${req.body.noOfQuestions}&category=${req.body.selectedCategory}&difficulty=${req.body.selectedDifficulty}&type=multiple&encode=url3986`)
            .then(response => response.json())
            .then(data => {
                res.status(200).send(data)
            })
            .catch(error => res.status(404).json({error: error}))
        
    } catch (error) {
        res.status(404).json({error: error})
    }
})
app.listen(port, () => {
    console.log(`app is listening to port, ${port}`);
})