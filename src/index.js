const express = require('express');
const bodyParser = require('body-parser');
const {PORT} = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
const db = require('./models/index');
const {User, Role} = require('./models/index');


const app = express();

const prepareAndStartServer = async()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api',apiRoutes);
   
    app.listen(3001,async ()=>{
        console.log(`Server started on PORT:${PORT}`);
        //console.log(db);
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter: true});
        }

        // const u1 = await User.findByPk(1);
        // const r1 = await Role.findByPk(3);
        // u1.addRole(r1);
       //const response = await u1.getRoles();  -->user u1 ke kitne roles hai
       //const response = await r1.getUsers();   //-->role r1 ke kitne users hai, for eg ADMIN role mein konse users hai
        //const response = await u1.hasRole(r1);
       //console.log(response);

    })
}
prepareAndStartServer();