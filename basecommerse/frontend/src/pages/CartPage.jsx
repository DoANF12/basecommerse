import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import axios from "axios";
import {
  FaPlusCircle,
  FaMinusCircle,
  FaTrashAlt,
  FaHeart,
} from "react-icons/fa";

const CartPage = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const {data} = await axios.get(`/api/books/${item._id}`);
    if (data.counInstock < quantity){
        window.alert('Sorry. Book is out of stock');
        return;
      }
      ctxDispatch({type:'CART_ADD_ITEM', payload: {...item,quantity}})
      
  }

  const removeItemHandler = (item) => {
    ctxDispatch({type:'CART_REMOVE_ITEM', payload: item});
  }

  const checkOutHandler = () => {
    navigate('/signin?redirect=/shipping');
  }

  const book = [];
  return (
    <div>
      <div className="container mx-auto h-screen">
        <h1 className=" font-thin text-2xl mx-8 py-2">Carrito</h1>
        <div className="bg-slate-200 p-1 rounded grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-2 mx-2">
          <div className="justify-start col-span-3 sm:col-span-3 md:col-span-4 lg:col-span-4 rounded-xl p-1">
            {cartItems.length === 0 ? (
              <div>No hay nada en el carro</div>
            ) : (
              <div>
                {cartItems.map((item) => (
                  <div className="flex justify-start" key={item._id}>
                    <ul className=" bg-white border border-gray-200 w-full text-gray-900">
                      <li
                        className="
                                grid 
                                grid-cols-2
                                sm:grid-cols-4
                                md:grid-cols-4
                                lg:grid-cols-4
                                justify-items-center
                                items-center
                                px-2
                                py-2
                                w-full
                                text-gray-400
                                cursor-default
                            "
                      >
                        <img
                          className=" h-[80px]"
                          src={item.image}
                          alt={item.title}
                        />{" "}
                        <Link className="mx-2" to={`/books/${item.isbn13}`}>
                          {item.title}
                        </Link>
                        <div className="grid grid-cols-3">
                          <div className="  col-span-1">
                            <button
                              className="  mx-1"
                              onClick={() => updateCartHandler(item, item.quantity - 1)}
                              disabled={item.quantity === 1}
                            >
                              <FaMinusCircle className="hover:text-red-700 active:text-red-500"></FaMinusCircle>
                            </button>
                          </div>
                          <div className="mx-2 col-span-1">
                            <span>{item.quantity}</span>
                            <span>{item.countInStock}</span>
                          </div>
                          <div className="col-span-1">
                            <button
                              className="  mx-1"
                              onClick={() => updateCartHandler(item, item.quantity + 1)}
                              disabled={item.quantity === item.countInStock}
                            >
                              <FaPlusCircle className="hover:text-yellow-500 active:text-yellow-300"></FaPlusCircle>
                            </button>
                          </div>
                        </div>
                        <div className=" grid grid-cols-3 justify-items-center items-center">
                          <div className=" col-span-1 text-green-500">
                            ${item.price}
                          </div>
                          <div className=" col-start-3">
                            <button onClick={() => removeItemHandler(item)} className=" hover:text-red-600">
                              <FaTrashAlt></FaTrashAlt>
                            </button>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="col-span-3 sm:col-span-3 md:col-span-2 lg:col-span-2 items-center  justify-center border-l-2 border-r-2 border-gray-300 rounded-xl p-6 ">
            <div className="flex-wrap -mx-1 justify-center">
              <div
                className="p-[1.5px] my-2 mx-2 bg-slate-50 shadow-lgbg-white text-gray-700 shadow-lg rounded-md overflow-hidden"
                key={book.isbn13}
              >
                <div className="p-5 flex-col gap-3">
                  <div className="px-[2px] py-0">
                    SubTotal ({cartItems.reduce((a,c) => a + c.quantity,0)}{' '}
                    items) : $
                    {cartItems.reduce((a,c) => a + c.price * c.quantity, 0)}
                  </div>  
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={checkOutHandler}
                      className="bg-yellow-500/80 hover:bg-yellow-500/90 px-2 py-1 rounded-md text-white font-medium tracking-wider hover:scale-105 transition"
                    >
                      Continuar la compra
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default CartPage;
