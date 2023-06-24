const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../config/serverConfig');
const bcrypt = require('bcrypt');
const AppErrors = require('../utils/error-handler');

class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            if(error.name == 'SequelizeValidationError'){
                throw error;
            }
            console.log("something went wrong in the service layer");
            throw error;
        }
    }

    async deleteUserById(userId){
        try {
            const response = await this.userRepository.deleteUserById(userId);
            return response;
        } catch (error) {
            console.log("something went wrong in the service layer");
            throw error;
        }
    }

    async SignIn(email, plainPassword){
        try {
            //Step 1-> fetch the details of user using emailId
            const user = await this.userRepository.getUserByEmail(email);

            //step 2 ->Check if incoming password matches the encrypted password
            const passwordsMatch = this.checkPaswword(plainPassword,user.password);
            if(!passwordsMatch){
                console.log("Password doesn't match");
                throw {error: 'Incorrect password'};
            }

            //step 3 -> if password match then create a token and send it to the user
            const newJWT  = this.createToken({email:user.email,password:user.password});
            return newJWT;
        } catch (error) {
            //console.log(error);
            if(error.name == 'AttributeNotFound'){
                throw error;
            }
            console.log("Something went wrong in the sign-in process");
            throw error;
        }
    }

    async isAuthenticated(token){
        try {
            const response = this.verifyToken(token);
            if(!response){
                throw {error: 'Invalid token'}
            }
            const user = await this.userRepository.getById(response.id);
            //let say user deletes their account then their details will not be present in db
           if(!user){
                throw {error: 'No user with the corresponding token exists'};
            }
            //if we got the user
            return user.id;
             
        } catch (error) {
            console.log("something went wrong in the auth process");
            throw error;
        }
    }


    //it is going to take the user object as an argument
    createToken(user){
        try {
            const result = jwt.sign(user,JWT_KEY,{expiresIn:"1d"});
            return result;
        } catch (error) {
            console.log("something went wrong in token creation");
            throw error;
        }
    }

    verifyToken(token){  //it is expecting jwt token as parameter
        try {
            const response = jwt.verify(token,JWT_KEY);
            return response;
        } catch (error) {
            console.log("something went wrong in token validation",error);
            throw error;
        }
    }

    checkPaswword(userInputPlainPassword, encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);  //it will return true or false
        } catch (error) {
            console.log("something went wrong in password comparison");
            throw error;
        }

    }

    isAdmin(userId){
        try {
            return this.userRepository.isAdmin(userId);
        } catch (error) {
            console.log("something went wrong in password comparison");
            throw error;
        }
    }

     
}

module.exports = UserService;