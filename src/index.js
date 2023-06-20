const express = require('express');
const {PORT} = require('./config/serverConfig');

const app = express();

const prepareAndStartServer = ()=>{
    app.listen(3001,()=>{
        console.log(`Server started on PORT:${PORT}`);
    })
}
prepareAndStartServer();