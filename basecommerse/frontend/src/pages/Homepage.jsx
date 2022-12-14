import React from 'react';
import date from '../data';
import { useState, useEffect, useRef, useCallback } from "react";
import Card from '../components/Card';

const Home = () => {
    const [data,setData] = useState();
    const getData = async () => {
        setData(date)
    };
    useEffect(() => {
        getData();
    }, []);
 return (
   <div>
     <h1 className="text-green-800 text-4xl">Welcome to the Homepage</h1>
     <h1>features Products</h1>
     <div className=' container px-20'>
        <Card
            date={date}
        ></Card>
     </div>
     
   </div>
 );
};

export default Home;


