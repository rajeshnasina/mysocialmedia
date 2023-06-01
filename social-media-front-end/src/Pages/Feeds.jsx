import React, {useEffect, useState}from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify' ;



const Feeds = () => {
    const [isFormSubmit, setIsFormSubmitted] = useState(false) ;
   const navigate = useNavigate();
    const formik = useFormik({
        initialValues : {
            title:'',
            description:'',
            imageUrl : '',
        },
        validationSchema : Yup.object({

            title: Yup.string()
                .min(3, "*Minimum 3 characters are required")
                .max(50, "*maximum 50 characters are required")
                .required('*required') ,

            description: Yup.string()
                .min(3, '*Minimum 3 characters are required')
                .max(250,'maximum 250 characters are required')
                .required('*required'),

            imageUrl: Yup.string()
                .url('*Please Enter a Valid ImageUrl')
                .required('*Image URL is required')
            
        }),
        onSubmit:(values) => {

            const timeDate = new Date();
            const time = timeDate.getHours() + ':' + timeDate.getMinutes() ;
            const date = new Date()

            const {title,description,imageUrl} = values ;
            const postDetails = {title:title,description:description,imageUrl:imageUrl,date:date,time:time}
            console.log(postDetails)
            console.log(values);

            fetch("http://localhost:3002/socialpost",{
            method : 'POST',
            headers : {
                'content-type' : 'application/json'
            },
            body:JSON.stringify(postDetails)
        })
        .then((res)=>res.json())
        .then((res)=>{
            console.log(res);
            setIsFormSubmitted(true)
            toast('Feed is submitted', { type: 'success' });
            setTimeout(()=>{
                navigate('/');
                setIsFormSubmitted(false)
            },2000)
           
        })
        .catch((err)=> console.log(err))

        }
    })
    
  return (
    <>
        
        <Container className="shadow  feed-form">
            <Row>
                <Col sm={12} md={6} className=' m-auto mb-3'>
                    <img className='feed-form-image w-100' src='https://img.freepik.com/free-vector/technology-background-abstract-style_23-2147832529.jpg?size=626&ext=jpg&ga=GA1.1.1843082682.1684306283&semt=location_fest_v1' alt='post a feed form' />
                </Col>
                <Col sm={12} md={6} className='m-auto '>
                    <Form onSubmit={formik.handleSubmit} >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter title" name='title' value={formik.values.title} onChange={formik.handleChange} />
                            {formik.errors.title && formik.touched.title ? <div className='text-danger'>{formik.errors.title}</div> : ''}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter description" name='description' value={formik.values.description} onChange={formik.handleChange} />
                            {formik.errors.description && formik.touched.description ? <div className='text-danger'>{formik.errors.description}</div> : ''}
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control type='text' name="imageUrl" placeholder='Enter your image url' value={formik.values.imageUrl} onChange={formik.handleChange}/>
                            {formik.errors.imageUrl && formik.touched.imageUrl ? <div className='text-danger'>{formik.errors.imageUrl}</div> : ""}
                        </Form.Group>

                

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        
     
        </Container>
       


        {isFormSubmit && <ToastContainer/>}
    </>
  )
}

export default Feeds