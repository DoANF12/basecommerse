import React from 'react';
// import date from '../data';
import { useEffect} from "react";
import Card from '../components/Card';
import axios from 'axios'
import { useReducer } from 'react';
import logger from 'use-reducer-logger';

const reducer = (state,action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return{...state,loading: true};
    case 'FETCH_SUCCESS':
      return {...state,  books: action.payload,loading:false};
    case 'FETCH_FAIL':
      return {...state,loading:false, error:action.payload};
    default:
      return state;
    
  }
};

const Home = () => {
    const [{loading,error,books}, dispatch] = useReducer(logger(reducer),{
      books: [],
      loading: true, 
      error:'',
    });
    //const [data,setData] = useState([]);
    
    useEffect(() => {
      getData();
    }, []);

    const getData = async () => {
      dispatch({type:'FETCH_REQUEST'});
      try {
        const result = await axios.get('/api/books');
        dispatch({type:'FETCH_SUCCESS', payload: result.data});
      } catch (err) {
        dispatch({type:'FETCH_FAIL',payload:err.message});
      }
      
      // setData(result.data)
    };
 return (
   <div>
     <h1 className="text-green-800 text-4xl">Welcome to the Homepage</h1>
     <h1>features Products</h1>
     {loading ? (
      <div>Loading....</div>
     ) : error ? (
      <div>{error}</div>
     ) : (
     <div className='container mx-auto md:px-12'>
        <Card
            data={books}
          ></Card>
     </div>
     ) }
   </div>
 );
};

export default Home;


