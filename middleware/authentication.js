const {validateToken} =  require("../services/authentication.js");

function  checkAuth (req,res,next){

    // cookie se  token nikala
    const token  =req.cookies?.token;

    if(!token){
        // user login hi nahi
        return next();
    }
    try{
        const userPayload  = validateToken(token);
        req.user  = userPayload;
        return next();

    }
    catch(err){
        // agar secret nahi mila dubara login, ya invalid token
       return  res.render("signin");
    }

    


} 

module.exports = {checkAuth,
}