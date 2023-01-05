import axios from "axios";
import { useReducer } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import StepChecks from "../components/StepsChecks";
import { Store } from "../Store";
import Loading from "../components/Loading"

const reducer = (state, action) => {
    switch(action.type) {
        case 'CREATE_REQUEST':
            return {...state, loading: true};
        case 'CREATE_SUCESS':
            return {...state, loading: false};
        case 'CREATE_FAIL':
            return {...state,loading: false};
        default:
            return state;
    }
}

const OrderPage = () => {
    const navigate = useNavigate();

    const [{loading}, dispatch] = useReducer(reducer,{
        loading: false,
    });
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const round2 = (num) => Math.round(num * 10 + Number.EPSILON) / 100;
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a,c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;  
  const placeOrderHandler = async () => {
    try{
        dispatch({ type: 'CREATE_REQUEST' });
        const {data} = await axios.post(
            '/api/orders',
            {
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            },
            {
                headers: {
                  authorization: `Bearer ${userInfo.token}`,
                },
            }
        );
        ctxDispatch({type:'CART_CLEAR'});
        dispatch({type:'CREATE_SUCCESS'});
        localStorage.removeItem('cartItems');
        navigate(`/order/${data.order._id}`);
    }catch(err){
        dispatch({type: 'CREATE_FAIL'});
        alert('Error')
    }
  };

  useEffect(() => {
    if(!cart.paymentMethod){
        navigate('/payment');
    }
  }, [cart, navigate])

  return (
    <div className="container  mx-auto  md:w-full">
      <StepChecks step1 step2 step3 step4></StepChecks>
      <h1 className=" font-thin text-2xl mx-8 py-2">Vista de la orden</h1>
      <div className="">
        <div className="block p-4 mx-6 rounded-lg shadow-lg bg-white">
          <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
            Compra
          </h5>
          <p className="text-gray-700 text-base mb-4">
            Name: {cart.shippingAddress.fullName}
          </p>
          <p className="text-gray-700 text-base mb-4">
            Address: {cart.shippingAddress.address}, {cart.shippingAddress.city}
            ,{cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
          </p>
          <Link className=" text-sky-400 hover:text-blue-900" to="/shipping">
            Edit
          </Link>
        </div>
        <div className="block py-2 my-2 p-4 mx-6 rounded-lg shadow-lg bg-white">
          <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
            Compra
          </h5>
          <p className="text-gray-700 text-base mb-4">
            Metodo: {cart.paymentMethod}
          </p>
          <Link className=" text-sky-400 hover:text-blue-900" to="/payment">
            Edit
          </Link>
        </div>
        <div className="block py-2 my-2 p-4 mx-6 rounded-lg shadow-lg bg-white">
          <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
            Articulos
          </h5>
          <div className="p-1 rounded grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-2 mx-2">
            <div className="justify-start col-span-3 sm:col-span-3 md:col-span-4 lg:col-span-4 rounded-xl p-1">
              {cart.cartItems.map((item) => (
                <div className="flex justify-start" key={item._id}>
                  <ul className=" bg-white border border-gray-200 w-full text-gray-900">
                    <li
                      className="
                                   grid 
                                   grid-cols-4
                                   sm:grid-cols-4
                                   md:grid-cols-4
                                   lg:grid-cols-4
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
                        <div className="mx-2 col-span-1">
                          <span>{item.quantity}</span>
                          <span>{item.countInStock}</span>
                        </div>
                        <div className="col-span-1"></div>
                      </div>
                      <div className=" grid grid-cols-3 justify-items-center items-center">
                        <div className=" col-span-1 text-green-500">
                          ${item.price}
                        </div>
                        <div className=" col-start-3"></div>
                      </div>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
            <div className="col-span-3 sm:col-span-3 md:col-span-2 lg:col-span-2 items-center  justify-center border-l-2 border-r-2 border-gray-300 rounded-xl p-6 ">
              <div className="flex-wrap -mx-1 justify-center">
                <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
                    Articulos
                </h5>
                <p className="text-gray-700 text-base mb-4">
                    {cart.itemsPrice.toFixed(2)}
                </p>
                <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
                    Compra
                </h5>
                <p className="text-gray-700 text-base mb-4">
                    {cart.shippingPrice.toFixed(2)}
                </p>
                <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
                    IVA
                </h5>
                <p className="text-gray-700 text-base mb-4">
                    {cart.taxPrice.toFixed(2)}
                </p>
                <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
                    Precio total de la orden
                </h5>
                <p className="text-gray-700 text-base mb-4">
                    {cart.totalPrice.toFixed(2)}
                </p>
                <button
                    type="button"
                    onClick={placeOrderHandler}
                    disabled={cart.cartItems.length === 0}
                    className="bg-yellow-500/80 hover:bg-yellow-500/90 px-2 py-1 rounded-md text-white font-medium tracking-wider hover:scale-105 transition"
                >
                    Continuar la compra
                </button>
              </div>
              {loading && <Loading></Loading>}
            </div>
          </div>
          <Link className=" text-sky-400 hover:text-blue-900" to="/cart">
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
