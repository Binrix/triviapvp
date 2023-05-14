let express = require("express");
let mongoose = require("mongoose");

let jwt = require("jsonwebtoken")
let bcrypt = require('bcrypt');

let User = require('./models/userModel')

//Constants
const PORT = 3001;
const MONGO_URL = 'mongodb+srv://app:POJ8QtL3Epeyx5wN@mycluster.r5sh42r.mongodb.net/?retryWrites=true&w=majority';

let app = express();

app.use(express.json);
 
mongoose.connect(MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
    .catch(error => {console.log(`Error:${error}`)});


// Handling post request
app.post("/login", async (req, res) => {
    let { username, password } = req.body;
    
    if (!username || !masterPassword)
    {
        res.status(400).json({error: "field empty",errorMessage: "The field for username and password must not be empty!"});
        return;
    }

    let existingUser = await User.findOne({ username: username });

    if (!existingUser || !bcrypt.compareSync(password, existingUser.password))
    {
        res.status(400).json({error: "invalid credentials", errorMessage:"No user found with these credentials"});
        return;
    }
    let token = jwt.sign(
        { user: existingUser },
        "secretkeyappearshere",
        { expiresIn: "2h" }
    );
    
    res.status(200).json({
        success: true,
        data: {
          userId: existingUser.id,
          email: existingUser.email,
          token: token,
        },
    });
});
   
// Handling post request
app.post("/signup", async (req, res) => {
    console.log("Request Received");
    const { username, password } = req.body;
    const newUser = User({
      username,
      password,
      createdAt: new Date()
    });
    await newUser.save();
    let token = jwt.sign(
        { user: newUser },
        "secretkeyappearshere",
        { expiresIn: "2h" }
    );
    res.status(201).json({
        success: true,
        data: { userId: newUser.id,
            email: newUser.email,
            token: token },
      });
  });

app.get('/', (req,res) => {
    res.status(200).json({test: "Hello"});
});

  app.get('/accessResource', (req, res)=>{  
    const token = req.headers.authorization.split(' ')[1]; 
    //Authorization: 'Bearer TOKEN'
    if(!token)
    {
        res.status(200).json({success:false, message: "Error! Token was not provided."});
    }
    //Decoding the token
    const decodedToken = jwt.verify(token,"secretkeyappearshere" );
    res.status(200).json({success:true, data:{userId:decodedToken.userId,email:decodedToken.email}});   
})

app.listen(PORT, (error) => {
    if(!error)
    {
        console.log(`App is listening on port ${PORT}`);
    }
    else
    {
        console.log("Error occurred, server can't start", error);
    }
});
