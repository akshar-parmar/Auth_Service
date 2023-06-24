const {User,Role} = require('../models/index');
const ValidationError = require('../utils/validation-error');
const ClientError = require('../utils/client-error');
const {StatusCodes} = require('http-status-codes');

class UserRepository {
    async create(data){
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            if(error.name == 'SequelizeValidationError'){
                throw new ValidationError(error);
            }
            console.log("Something went wrong on the repository layer");
            throw error;
        }
    }
    async deleteUserById(userId){
       try {
            await User.destroy({
                where:{
                    id:userId
                }
            });
            return true;
        } catch (error) {
            console.log("Something went wrong on the repository layer");
            throw error;
        }
    } 

    async getById(userId){
        try {
            const user = await User.findByPk(userId,{
                attributes:['email','id']
            });
            return user;
        } catch (error) {
            console.log("Something went wrong on the repository layer");
            throw error;
        }
    }

    //get user by email
    async getUserByEmail(emailId){
        try {
            const user = await User.findOne({
                where:{
                    email:emailId
                }
            });
            //if user with this email doesnt exist then throw the ClientError
            if(user==null){
                throw new ClientError(
                    'AttributeNotFound',  //nameproperty
                    'Invalid email sent in the request',  //message
                    'Please check the email, as there is no record of the email',  //explanation
                    StatusCodes.NOT_FOUND  //statusCode
                );
            }
            return user;
            
        } catch (error) {
            //console.log(error);
            console.log("Something went wrong on the repository layer");
            throw error;
        }
    }

    async isAdmin(userId){
        try {
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where:{
                    name:'ADMIN'
                }
            });
            //below is the magic method
            return user.hasRole(adminRole);
        } catch (error) {
            console.log("Something went wrong on the repository layer");
            throw error;
        }
    }

}

module.exports=UserRepository;