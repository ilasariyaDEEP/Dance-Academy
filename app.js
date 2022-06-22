const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  mongoose.connect('mongodb://localhost:27017/contactDance', {useNewUrlParser: true});
}
const bodyparser = require("body-parser");
const port = 8000;

// Define Mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const contact = mongoose.model('contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    
    res.status(200).render('home.pug');
});

// app.get('/home', (req, res)=>{
//     
//     res.status(200).render('home.pug');
// });

app.get('/aboutus', (req, res)=>{
    
    res.status(200).render('aboutus.pug');
});

app.get('/services', (req, res)=>{
    
    res.status(200).render('services.pug');
});

app.get('/classes', (req, res)=>{
    
    res.status(200).render('classes.pug');
});

app.get('/contact', (req, res)=>{
    
    res.status(200).render('contact.pug');
});

app.post('/contact', (req, res)=>{
    const myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("This Item has been Saved to the Database.")
    }).catch(()=>{
        res.status(400).send("Item was not saved")
    })
    
});

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});