const UserService = require('../services/user-services');
const userService = new UserService();
const create = async(req,res)=>{
    try {
        const response = await userService.create({
            email:req.body.email,
            password: req.body.password

        });
        return res.status(201).json({
            success:true,
            message:"Successfullly created a new user",
            data: response,
            err:{}
        })
    } catch (error) {
        //console.log(error);
        return res.status(error.statusCode).json({
            message:error.message,
            data:{},
            success:false,
            err:error.explanation
        });
    }
}
const signIn = async(req,res)=>{
    try {
        //since email and password are sensitive data it will come inside body params, not in url ie query params
        const response = await userService.SignIn(req.body.email,req.body.password);
        return res.status(200).json({
            success:true,
            message:"Successfullly sign-in",
            data: response,
            err:{}
        });
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            message:error.message,
            data:{},
            success:false,
            err:error.explanation
        });
    }

}

const isAuthenticated = async(req,res)=>{
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            success: true,
            data: response,
            err:{},
            message: 'user is authenticated and token is valid'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Something went wrong",
            data:{},
            success:false,
            err:error
        });
    }
};

const deleteUser = async(req,res)=>{
    try {
        const response = await userService.deleteUserById(req.params.id);
        return res.status(200).json({
            data: response,
            success: true,
            err:{},
            message: 'user is deleted successfully'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Something went wrong",
            data:{},
            success:false,
            err:error
        });
    }
}
const isAdmin = async(req,res)=>{
    try {
        const response = await userService.isAdmin(req.body.id);
        return res.status(200).json({
            data: response,
            success: true,
            err:{},
            message: 'Successfully fetched whether user is admin or not'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Something went wrong",
            data:{},
            success:false,
            err:error
        });
    }
}

module.exports={
    create,
    signIn,
    isAuthenticated,
    deleteUser,
    isAdmin
}