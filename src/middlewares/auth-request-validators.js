const validateUserAuth = (req,res,next)=>{
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            success:false,
            data: {},
            message: 'Something went wrong',
            err : 'Email or password missing in the  request'
        })
    }
    //and if everything goes well then we will call the next(), which will call the signIn 
    next();
}

const validateIsAdminRequest = (req,res,next) =>{
    if(!req.body.id){
        return res.status(404).json({
            data:{},
            success:false,
            err:'user id not given',
            message: 'something went wrong'

        });
    }
    
    next();

}

module.exports = {
    validateUserAuth,
    validateIsAdminRequest
}