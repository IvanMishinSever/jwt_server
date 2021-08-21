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
app.use(cors());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE" // what matters here is that OPTIONS is present
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });

app.use("/api/auth", registerRouter);

app.use("/api/auth", loginRouter);
app.use("/api/auth", logoutRouter);
app.use("/api/auth", activateRouter);
app.use("/api/auth", refreshRouter);
app.use("/api/users",authMiddleware, usersRouter);






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