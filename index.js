const express = require('express');
const app = express();

const registerRouter = require('./routes/register_router');



const config = require('config');
const PORT = config.get('serverPort');
app.use(express.json());

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


  //START SERVER
const start = () => {
    try {
        app.listen(PORT, () => {
            console.log(`START SERVER! on port ${PORT}`);
        })
    } catch(e) {

    }
}
start();