const express = require('express');
const bodyParser = require('body-parser');
const {PORT} = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
//const UserRepository = require('./repository/user-repository');
 //const UserService = require('./services/user-services');

const app = express();

const prepareAndStartServer = async()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api',apiRoutes);
   
    app.listen(3001,()=>{
        console.log(`Server started on PORT:${PORT}`);
    })
}
prepareAndStartServer();