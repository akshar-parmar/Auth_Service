const express = require('express');
const bodyParser = require('body-parser');
const {PORT} = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
//const UserRepository = require('./repository/user-repository');
// const UserService = require('./services/user-services');

const app = express();

const prepareAndStartServer = async()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api',apiRoutes);
    // const service = new UserService();
    // const tokenGenerated = service.createToken({
    //     email:"akshar@admin.com",
    //     id:1
    // });
    // console.log("new token is ",tokenGenerated);
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFrc2hhckBhZG1pbi5jb20iLCJpZCI6MSwiaWF0IjoxNjg3MzQ1MDc2LCJleHAiOjE2ODczNDUxMDZ9.loA2bOqAC0q39c_ED9YYlQYzKOLNjjDKbQWL5WaG-lA';
    // const response = service.verifyToken(token);
    // console.log(response);
    app.listen(3001,()=>{
        console.log(`Server started on PORT:${PORT}`);
    })
}
prepareAndStartServer();