const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const errorMiddleware = require('./middlewares/error_middleware');
const authMiddleware = require('./middlewares/auth_middleware');

const registerRouter = require('./routes/register_router');

const loginRouter = require('./routes/login_router');
const logoutRouter = require('./routes/logout_router');
const activateRouter = require('./routes/activate_router');
const refreshRouter = require('./routes/refresh_router');
const usersRouter = require('./routes/users_router');



const config = require('config');
const { response } = require('express');
const PORT = config.get('serverPort');
app.use(express.json());
app.use(cookieParser());
// FOR SAVING COOKIES!!!!!
const host = config.get('client-url')
const hostserver = config.get('api-url')

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      
      "OPTIONS, GET, POST, PUT, PATCH, DELETE" // what matters here is that OPTIONS is present
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });


app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));



/*
  let whitelist = [host]
  var corsOptions = {
    credentials: true,
    origin: 'http://localhost:3000'
    /*
    function(origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        console.log("ss0" + whitelist.indexOf(origin));
        console.log(origin);
       
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
        
      }
    }
    
  }
  

  app.use(cors(corsOptions));
*/




app.use("/api/auth", registerRouter);

app.use("/api/auth", loginRouter);
app.use("/api/auth", logoutRouter);
app.use("/api/auth", activateRouter);
app.use("/api/auth", refreshRouter);
app.use("/api/users",authMiddleware, usersRouter);

app.get('/set-cookie', (req, res) => {
  res.cookie('token', '12345ABCDE')
  res.send('Set Cookie')
})

app.get('/get-cookie', (req, res) => {
  console.log('Cookie: ', req.cookies)
  res.send('Get Cookie')
})




// middleware in the END!!!!!!

app.use(errorMiddleware);

  //START SERVER
const start = async() => {
    try {
        app.listen(PORT, () => {
            console.log(`START SERVER! on port ${PORT}`);
        })
    } catch(e) {
console.log(e);
    }
}
start();