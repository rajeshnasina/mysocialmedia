import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import {  getPostCount} from '../Reducers/MyReducer';
import { ToastContainer, toast } from 'react-toastify';
const Home = (props) => {
    // let test = true;
    const [posts, setPosts] = useState([]);
    const [state, setState] = useState(false)
    const [bookMark, setBookMark] = useState(false) ;
    const [isBookMarkAdded, setIsBookMarkAdded] = useState(false) ;
    const dispatch = useDispatch();
    console.log('bookmarked-status',bookMark)
    function getAllPosts(){
        fetch("http://localhost:3002/socialpost",{
            method : 'GET'
        })
        .then((res)=> res.json())
        .then((res)=> {
            console.log('get all posts : ',res);
            //sorting(res)
            setBookMark(res)
            setPosts(res);
            
             
            dispatch(getPostCount(res.length))
        })
        .catch((err)=> console.log(err))

        
    }
    useEffect(()=>{
        getAllPosts()
    },[])

    

    function addToBookMark(postId, isSaved){
            console.log(isSaved)
    
            fetch("http://localhost:3002/bookmark/" + postId ,{
                method : 'PATCH',
           
            })
            .then((res)=> res.json())
            .then((res)=> {
                console.log('updated response : ', res)
                getAllPosts()
                setIsBookMarkAdded(true);
                {isSaved ? toast('Feed is Removed from BookMark',{type:'error',theme:'dark',position:'top-center'}): toast('Feed is added to BookMark',{type:'success',theme:'dark',position:'top-center'}) }
                setTimeout(()=>{
                    setIsBookMarkAdded(false)
                    
                },2000)
            console.log(res);
            props.test()
            })
            .catch((err)=> console.log(err))
    
            } 

            
        
    
  return (
    <div>
        
        <div className="container my-5">
            <div className="row">
            {posts.map((each)=>{
                const date = new Date(each.date);
                const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
                // test = each.bookmarked ;
                // console.log('test: ',test)
            return(
                   <div key={each._id} className='col-12 col-md-6 col-lg-4 col-xl-3 mt-5' >
                    
                    <Card className='main-card m-auto  shadow '   >
                        <Card.Img variant="top" className='card-image'  src={each.imageUrl} />
                        <Card.Body>
                            <Card.Title className='card-title'>{each.title}</Card.Title>
                            <Card.Text className='card-description'>{each.description}</Card.Text>
                            <Card.Text>
                            <small className="text-muted date-time">
                                Date: {formattedDate} | Time: {each.time}
                            </small>
                            </Card.Text>

                            {each.bookmarked ? <button className='w-100 card-button btn btn-outline-danger' onClick={() => addToBookMark(each._id, each.bookmarked)}>Remove from Bookmarks</button> : <button className='w-100 card-button btn btn-outline-success' onClick={() => addToBookMark(each._id, each.bookmarked)}>Add to Bookmarks</button>}
                         </Card.Body>
                        
                    </Card>
                   
                    </div>
            )
        })}
            </div>
            
        </div>
            
         {isBookMarkAdded && <ToastContainer position="top-center"
autoClose={2000}/>}
        
        
    </div>
  )
}

export default Home;