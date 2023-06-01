import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css' ;
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import Feeds from './Pages/Feeds';
import BookMark from './Pages/BookMark';
import { getPostCount } from './Reducers/MyReducer';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getBookMarkCount } from './Reducers/MyReducer';
import NoPage from './Pages/NoPage';
function App() {
  const dispatch = useDispatch();
  function getAllPosts(){
    fetch("http://localhost:3002/socialpost",{
        method : 'GET'
    })
    .then((res)=> res.json())
    .then((res)=> {
        console.log(res);
        
        dispatch(getPostCount(res.length))
    })
    .catch((err)=> console.log(err))
}
  function getAllBookMarkPosts(){
    fetch("http://localhost:3002/bookmark/save",{
                method:'GET'
            })

            .then((res)=>res.json())
            .then((res)=>
                {
                    console.log(res) ;
                    dispatch(getBookMarkCount(res.length))
                }
            )
            .catch((err)=>console.log(err))
  }
  useEffect(()=>{
      getAllPosts() 
      getAllBookMarkPosts()
  },[])

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
              <Route index element={<Home test={getAllBookMarkPosts} />} />
              <Route path='feeds' element={<Feeds/>} />
              
              <Route path='bookmark' element={<BookMark test={getAllBookMarkPosts}/>} />
              <Route path='*' element={<NoPage/>} />
           </Route>
        </Routes>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
