import { useReducer, useEffect, useState } from 'react';
import axios from 'axios'
import { useParams } from "react-router-dom";


const reducer = (state,action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
        return{...state,loading: true};
        case 'FETCH_SUCCESS':
        return {...state,  book:action.payload, loading:false};
        case 'FETCH_FAIL':
        return {...state, loading:false, error:action.payload};
        default:
        return state;     
    }
};

function BooksInfo () {
    const params = useParams();
    const { codigoISBN } = params;
    // const [books,setBooks] = useState("");


    const [{loading,error,book}, dispatch] = useReducer(reducer,{
        book: "",
        loading: true, 
        error:'',
    });      
    useEffect(() => {
        const getData = async () => {
            dispatch({type:'FETCH_REQUEST'});
            try {
                const result = await axios.get(`/api/books/codigoISBN/${codigoISBN}`);
                dispatch({type: 'FETCH_SUCCESS', payload: result.data});
            } catch (err) {
                dispatch({type: 'FETCH_FAIL', payload:err.message});
            }       
        };
        getData();
    }, [codigoISBN]);
  
    
    return (
        
        loading? <div>Loading...</div>
        : error? <div>{error}</div>
        :
        <div>
            <header>Detalle del Producto</header>
            <section>
                <div className='flex flex-row' >
                    <div className='basis-2/3 p-5 gap-4'>
                        <div className='flex'>
                            <ul className=' flex-initial w-32'>
                                <li className='py-1'>
                                    <img className='m-full px-4' src={book.image} alt={book.image} />
                                </li>
                                <li className='py-1'>
                                    <img className='m-full px-4' src={book.image} alt={book.image} />
                                </li>
                                <li className='py-1'>
                                    <img className='m-full px-4' src={book.image} alt={book.image} />
                                </li>
                            </ul>  
                            <img className='m-full flex-initial w-96 px-4' src={book.image} alt={book.image} />
                    
                        </div>
                        
                        
                      </div>
                    <div className='font-bold basis-1/3  max-w-lg text-xl'>
                        <p>{book.titulo}</p>
                    </div>
                </div>
            </section>
            {book.titulo}
        </div>
    );
};

export default BooksInfo;