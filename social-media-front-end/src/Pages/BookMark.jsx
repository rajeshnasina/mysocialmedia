import React, { useEffect, useState } from 'react' ;
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
const BookMark = (props) => {
   const [data, setData] = useState([]) ;
   const [isBookMarkRemoved, setIsBookMarkRemoved] = useState(false) ;
   useEffect(()=>{
        getBookMarkPost();
        
   },[])

   function getBookMarkPost(){

            fetch("http://localhost:3002/bookmark/save",{
                method:'GET'
            })

            .then((res)=>res.json())
            .then((res)=>
                {   
                    console.log(res) ;
                    setData(res)
                }
            )
            .catch((err)=>console.log(err))

              // here app.js getAllBookMarkPosts function  called 
   }

   function onDelete(id){
        //alert(id) 
        const check = window.confirm('Are you sure You want remove from bookmark') ;
        console.log(check)
        if(check){
            fetch("http://localhost:3002/bookmark/remove/" + id,{
            method : 'PATCH'
        })
        .then((res) => res.json())
        .then((res)=>{
            props.test()
            setIsBookMarkRemoved(true) ;
            toast('BookMark is Removed', { type: 'error' ,theme:'dark',position:'top-center'});
            setTimeout(()=>{
                setIsBookMarkRemoved(false);
                getBookMarkPost()
            },2000)
            console.log(res);
            
        })
        .catch((err)=>console.log(err))
        }
        
   }


  return (
    <div>
        <div className="container my-5">
            <div className="row">
            {data.length>0 ? data.map((each)=>{
                const date = new Date(each.date);
                const formattedDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
            return(
                   <div key={each._id} className='col-12 col-md-6 col-lg-4 col-xl-3 mt-5' >

                    <Card  className='main-card m-auto  shadow ' >
                        <Card.Img variant="top" className='card-image' src={each.imageUrl} />
                        <Card.Body>
                            <Card.Title className='card-title'>{each.title}</Card.Title>
                            <Card.Text className='card-description'>{each.description}</Card.Text>
                            <Card.Text>
                            <small className="text-muted">
                                Date: {formattedDate} | Time: {each.time}
                            </small>
                            </Card.Text>
                            <button className='w-100 btn btn-outline-danger' onClick={()=>onDelete(each._id)}>remove</button>
                        </Card.Body>
                        
                    </Card>
                   
                    </div>
            )
        }): <div className='empty-bookmark'>
                <h3>No BookMark/Saved Posts</h3>
            </div>}
            </div>
            
        </div>
        {isBookMarkRemoved && <ToastContainer />}
    </div>
  )
}

export default BookMark