import { useReducer, useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import Rating from "../components/Rating";
import Card from "../components/Card";
import { FaStar, FaHeart, FaEye } from "react-icons/fa";
import Loading from "../components/Loading";
import NotFound from "../components/NotFound";
import { useContext } from "react";
import { Store } from "../Store";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, book: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function BooksInfo() {
  const navigate = useNavigate();
  const params = useParams();
  const { isbn13 } = params;
  // const [books,setBooks] = useState("");

  const [{ loading, error, book }, dispatch] = useReducer(reducer, {
    book: "",
    loading: true,
    error: "",
  });
  useEffect(() => {
    const getData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/books/isbn13/${isbn13}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    getData();
  }, [isbn13]);

  const {state,dispatch: ctxDispach} = useContext(Store);
  const {cart} = state;

  const addToCartHandler  = async() => {
    const existItem = cart.cartItems.find((x) => x.id === book.id);
    const quantity = existItem ? existItem.quantity + 1:1;
    const { data } = await axios.get(`/api/books/${book.id}`);
    if (data.counInstock < quantity){
      window.alert('Sorry. Book is out of stock');
      return;
    }
    ctxDispach({type:'CART_ADD_ITEM', payload: {...book,quantity}})
    navigate('/cart')
  }

  return loading ? (
    <Loading></Loading>
  ) : error ? (
    <NotFound></NotFound>
  ) : (
    <div>
      
      <section> 
        <div className="container mx-auto md:h-screen md:w-full">
        <h1 className=" font-thin text-2xl mx-8 py-2">Lista de libros</h1>
          <div className="bg-slate-200 p-1 rounded grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2 mx-8">
            <div className="flex justify-center col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 rounded-xl p-3">
              <ul className=" ">
                <li className="py-1">
                  <img
                    className="m-full w-32 sm:px-1 md:px-4"
                    src={book.image}
                    alt={book.image}
                  />
                </li>
                <li className="py-1">
                  <img
                    className="m-full w-32 sm:px-1 md:px-4"
                    src={book.image}
                    alt={book.image}
                  />
                </li>
                <li className="py-1">
                  <img
                    className="m-full w-32 sm:px-1 md:px-4"
                    src={book.image}
                    alt={book.image}
                  />
                </li>
              </ul>
            </div>
            <div className="flex col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-3 items-center  justify-center border-l-2 border-r-2 border-gray-300 rounded-xl p-6 ">
              <img
                className=" sm:h-20 sm:w-20 m-full flex-initial md:w-48 md:h-48 px-4 hover:scale-125 transition-all duration-500 cursor-pointer"
                src={book.image}
                alt={book.image}
              />
            </div>
            <div className="col-span-3 sm:col-span-3 md:col-span-2 xl:col-span-2 justify-center  rounded-xl ">
              <div className="flex-wrap -mx-1 justify-center">
                <div
                  className="p-[1.5px] my-2 mx-2 bg-slate-50 shadow-lgbg-white text-gray-700 min-h-[10rem] shadow-lg rounded-md overflow-hidden"
                  key={book.isbn13}
                >
                  <div className="p-5 flex-col gap-3">
                    <div className="px-[3px] py-1">
                      <div className="grid  items-full gap-2">
                        <span className="flex justify-self-start px-1.5 py-0.5 text-xs rounded-md bg-slate-300">
                          si hay en stock
                        </span>
                        <span className="flex justify-self-start px-1.5 py-0.5 text-xs rounded-md bg-slate-300">
                          no
                        </span>   
                        <div className="col-end-5 flex justify-end">
                            <button className="justify-center items-center px-1.5 hover:scale-125 py-0.5 bg-gray-300/60 hover:bg-gray-300/80 transition rounded-md">
                                <FaHeart className="opacity-50"></FaHeart>
                            </button> 
                        </div>                    
                      </div>
                    </div>
                    

                    <div className="px-[2px] py-0">
                      <Link to={`/books/${book.isbn13}`}>
                        <div className="font-bold text-xl">{book.titulo}</div>
                      </Link>
                      {/* <p className="text-gray-700 text-base">
                            {book.descripcion}
                        </p> */}
                    </div>
                    <div>
                      <span className="text-xl font-bold">Precio: $100</span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm line-through opacity-50">
                          $1000
                        </span>
                        <span className=" bg-green-400 px-1.5 py-0.5 text-xs text-white rounded-md">
                          save 20%
                        </span>
                      </div>
                    </div>
                    <span className="flex items-center mt-1">
                      <Rating
                        rating={book.rating}
                        numReviews={book.numReviews}
                      ></Rating>
                    </span>
                    <p className="text-gray-700 text-base">
                         Descripcion: 
                         
                    </p>
                    <span className=" text-sm text-gray-600">
                        {book.descripcion}
                    </span>
                    <div>
                        {book.counInstock > 0 ? (
                            <span className=" bg-green-600 px-1.5 py-0.5 text-xs text-white rounded-md">
                            In Stock
                          </span>
                        ) : (
                            <span className=" bg-red-600 px-1.5 py-0.5 text-xs text-white rounded-md">
                          Agotado
                        </span>
                        )    
                        }
                
                    </div>
                    <div className="mt-2 flex gap-2">
                      {/* <p><strong>${book.precio}</strong></p> */}
                      <button onClick={addToCartHandler} className="bg-yellow-500/80 hover:bg-yellow-500/90 px-2 py-1 rounded-md text-white font-medium tracking-wider hover:scale-105 transition">
                        Add to car
                      </button>
                      
                      {/* <button className="flex-grow flex justify-center items-center bg-gray-300/60 hover:bg-gray-300/80 transition rounded-md">
                        <FaEye className="opacity-50"></FaEye>
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BooksInfo;
