const express = require('express');
const bodyParser = require('body-parser');
const {PORT} = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
//const UserRepository = require('./repository/user-repository');

const app = express();

const prepareAndStartServer = async()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api',apiRoutes);
    // const userrepo = new UserRepository();
    // const user = await userrepo.getById(5);
    // console.log(user);
    app.listen(3001,()=>{
        console.log(`Server started on PORT:${PORT}`);
    })
}
prepareAndStartServer();