var SocialMediaModel = require('../model/socialMedia') ;

const getSocialMediaPosts = async function(req,res){
   await SocialMediaModel.find({})
    .then((data)=>res.send(data))
    .catch((err)=>console.log(err))
}



 
const createPost = async function(req,res){
    const body = req.body ;

    try{
        let data = await SocialMediaModel.create(body) 
        return res.send(data)
    }
    catch(err){
        return res.send(err)
    }
}




module.exports = {getSocialMediaPosts, createPost} 