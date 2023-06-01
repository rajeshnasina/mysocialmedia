const SocialMediaModel = require('../model/socialMedia');




const getBookMarkedPosts = async function(req,res,next){
    const savedPosts = await SocialMediaModel.find({bookmarked:true})
    
    res.send(savedPosts)
    
}

const createBookMarkPosts = async function(req,res,next){
    const postId = req.params.id;
    
    try {
      const post = await SocialMediaModel.findById(postId);
      console.log(post)
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      post.bookmarked = !post.bookmarked; // Toggle the bookmarked status
  
      await post.save();
      console.log(post)
      res.json(post);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }

}

const removeBookMarkedPosts = async function(req,res){
    const postId = req.params.id ;

    try{
        const post = await SocialMediaModel.findById(postId);

        if(!post) {
            return res.status(404).json({ error: 'Post not found'})
        }

        post.bookmarked = !post.bookmarked ;
        await post.save();
        res.json(post);
    }

    catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal Server Error'});
    }
}

module.exports = { getBookMarkedPosts,createBookMarkPosts, removeBookMarkedPosts}