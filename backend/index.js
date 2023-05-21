let express = require("express");
let mongoose = require("mongoose");
let https = require("https");
let uuid = require('uuid');
let http = require("http");

let jwt = require("jsonwebtoken")
let bcrypt = require('bcrypt');

let User = require('./models/userModel');
let quizSchema = require('./models/quiz');
const { Server } = require("socket.io");
const { type } = require("os");

//Constants
const PORT = 3000;
const MONGO_URL = 'mongodb+srv://app:POJ8QtL3Epeyx5wN@mycluster.r5sh42r.mongodb.net/?retryWrites=true&w=majority';
const KEY = '98BsVId1kAJf7X1PU62Frw';


let app = express();
const httpServer = new http.Server(app);
const io = new Server(httpServer, { cors: { origin: "*" }});

const createLog = (req, res, next) => {
    res.on("finish", function() {
      console.log(req.method, decodeURI(req.url), res.statusCode, res.statusMessage);
    });
    next();
  };

app.use(express.json());
app.use(createLog);

mongoose.connect(MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
    .catch(error => {console.log(`Error:${error}`)});

// Handling post request
app.post("/api/login", async (req, res) => {
    let { username, password } = req.body;

    if (!username || !password)
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
        { userId: existingUser.id },
        KEY,
        { expiresIn: "2h" }
    );
    
    res.status(200).json({
        username: existingUser.username,
        token: token,
    });

    // res.render('start');
});
   
// Handling post request
app.post("/api/signup", async (req, res) => {
    let { username, password } = req.body;

    let user = await User.findOne({username: username})    

    if (user !== null)
    {
        res.status(400).json({error: "username taken",errorMessage: "This Username is already taken!"});
        return;
    }

    let hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = User({
      username,
      password: hashedPassword,
      createdAt: new Date()
    });

    dbUser = await User.create(newUser);

    let token = jwt.sign(
        { userId: dbUser.id },
        KEY,
        { expiresIn: "2h" }
    );

    res.status(201).json({
        username: dbUser.username,
        jwttoken: token
    });

    // res.render('start');
});

app.post('/api/create', isAuthentificated, (req, res)=>{  
    const { difficulty, subject } = req.body;
 
    https.get(`https://opentdb.com/api.php?amount=10&category=${subject}&difficulty=${difficulty}`, response => {
        let data = [];

        response.on('data', chunk => {
            data.push(chunk);
        });

        response.on('error', msg => {
            res.status(404).json({msg});
        });

        response.on('end', () => {
            lobbyUrl = uuid.v4();
            const quiz = JSON.parse(Buffer.concat(data).toString());
            newQuiz = {
                lobbyurl: lobbyUrl,
                quizContent: quiz.results
            }
            quizSchema.create(newQuiz);

            res.status(200).json({ roomId: uuid.v4(), quizContent: quiz.results });

        });
    });
});

let rooms = [];

io.on("connection", socket => {
    socket.on("join", (roomId) => {
        var room = rooms.find(r => r.roomId == roomId); 

        if(room == undefined) {
            rooms.push({ roomId: roomId, amountPlayers: 1 });
        } else {
            room.amountPlayers++;
        }; 

        socket.join(roomId);
    });
    socket.on("leave", (roomId) => {
        socket.leave(roomId);
    });
});

app.get('/api/rooms', isAuthentificated, (req, res) => {
    res.status(200).json(rooms);
});

app.get('/api/join/:roomId', isAuthentificated, (req, res)=> {
    console.log(req.params.roomId);

    

    res.status(200).json({userId: res.locals.userId});   
})

function isAuthentificated(req,res,next)
{
    if(!req.headers.authorization)
    {
        res.status(401).json({error: "unauthorized",errorMessage: "For accessing this route you need to have an JWT Token"});
        return;
    }

    let token = req.headers.authorization.split(' ')[1]; 
    //Authorization: 'Bearer TOKEN'
    if(!token)
    {
        res.status(401).json({error: "unauthorized",errorMessage: "Error! JWT Token was not provided."});
        return;
    }

    try
    {
        //Decoding the token
        res.locals.userId = jwt.verify(token,KEY ).userId;
        next();
    }
    catch (err)
    {
        if(err.name == "TokenExpiredError")
        {
            res.status(401).json({error: "unauthorized",errorMessage: "Your session expired. please login again!"});
        }
        else
        {
            res.status(401).json({error: "unauthorized",errorMessage: "Error! JWT Token was invalid."});            
        }
    }
}

httpServer.listen(PORT, (error) => {
    if(!error)
    {
        console.log(`App is listening on port ${PORT}`);
    }
    else
    {
        console.log("Error occurred, server can't start", error);
    }
});
