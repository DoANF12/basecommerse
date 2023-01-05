import axios from "axios";
import { useContext } from "react";
import { useEffect } from "react";
import { useReducer } from "react"
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading"
import { Store } from "../Store";

function reducer(state,action){
    switch (action.type){
        case 'FETCH_REQUEST':
            return {...state,loading:true,error: ''};
        case 'FETCH_SUCCESS':
            return {...state, loading:false, order: action.payload, error: ''};
        case 'FETCH_FAIL':
            return {...state, loading: false, error: action.payload};
        default:
            return state;
        }
}

const InfOrderPage = () => {
    const {state} = useContext(Store);
    const {userInfo} = state;
    const params = useParams();
    const { id: orderId } = params;
    const navigate = useNavigate();
    const [{ loading, error, order}, dispatch] = useReducer(reducer, {
        loading: true,
        order:{},
        error: '',
    });

    useEffect(() => {
        const fetchOrder = async () => {
            try{
                dispatch({type: 'FETCH_REQUEST'});
                const {data} = await axios.get(`/api/orders/${orderId}`,{
                    headers: { authorization: `Bearer ${userInfo.token}`},
                });
                dispatch({ type: 'FETCH_SUCCESS', payload: data});
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: 'Error'})
            }
        }
        if(!userInfo){
            return navigate('/login')
        }
        if(
            !order._id ||
            (order._id && order._id !== orderId)
        ){
            fetchOrder();
        }
    },[])
    
    return (
        <div>
            {loading ? (<Loading></Loading>)
            : error ? (
                <div className="alert bg-red-400 rounded-lg py-5 px-6 mb-3 text-base text-yellow-700 inline-flex items-center w-full alert-dismissible fade show" role="alert">
                    <strong class="mr-1">Error</strong> 
                    <button type="button" class="btn-close box-content w-4 h-4 p-1 ml-auto text-yellow-900 border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-yellow-900 hover:opacity-75 hover:no-underline" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            ) : (
                <div className="container  mx-auto  md:w-full">
                <h1 className=" font-thin text-2xl mx-8 py-2">Orden {orderId}</h1>
                    <div className="block p-4 mx-6 rounded-lg shadow-lg bg-white">
                    <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
                        Compra
                    </h5>
                    <p className="text-gray-700 text-base mb-4">
                        Name: {order.shippingAddress.fullName}
                    </p>
                    <p className="text-gray-700 text-base mb-4">
                        Address: {order.shippingAddress.address}, {order.shippingAddress.city}
                        ,{order.shippingAddress.postalCode}, {order.shippingAddress.country}
                    </p>
                    {order.isDelivered ? (
                        <div className="alert bg-green-400 rounded-lg py-5 px-6 mb-3 text-base text-yellow-700 inline-flex items-center w-full alert-dismissible fade show" role="alert">
                            <strong className="mr-1">Entregada a</strong> {order.deliveredAt}
                            <button type="button" className="btn-close box-content w-4 h-4 p-1 ml-auto text-yellow-900 border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-yellow-900 hover:opacity-75 hover:no-underline" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    ) : (
                        <div className="alert bg-red-400 rounded-lg py-5 px-6 mb-3 text-base text-yellow-700 inline-flex items-center w-full alert-dismissible fade show" role="alert">
                            <strong className="mr-1">No </strong> entregada
                            <button type="button" className="btn-close box-content w-4 h-4 p-1 ml-auto text-yellow-900 border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-yellow-900 hover:opacity-75 hover:no-underline" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    )

                    }
                    </div>
                    <div className="block py-2 my-2 p-4 mx-6 rounded-lg shadow-lg bg-white">
                        <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
                            Compra
                        </h5>
                        <p className="text-gray-700 text-base mb-4">
                            Metodo: {order.paymentMethod}
                        </p>
                        {order.isPaid ? (
                            <div className="alert bg-green-400 rounded-lg py-5 px-6 mb-3 text-base text-yellow-700 inline-flex items-center w-full alert-dismissible fade show" role="alert">
                                <strong className="mr-1">Pagado en</strong> {order.paidAt}
                                <button type="button" className="btn-close box-content w-4 h-4 p-1 ml-auto text-yellow-900 border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-yellow-900 hover:opacity-75 hover:no-underline" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        ) : (
                            <div className="alert bg-red-400 rounded-lg py-5 px-6 mb-3 text-base text-yellow-700 inline-flex items-center w-full alert-dismissible fade show" role="alert">
                                <strong className="mr-1">No </strong> pagado
                                <button type="button" className="btn-close box-content w-4 h-4 p-1 ml-auto text-yellow-900 border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-yellow-900 hover:opacity-75 hover:no-underline" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        )}        
                    </div>
                    <div className="block py-2 my-2 p-4 mx-6 rounded-lg shadow-lg bg-white">
          <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
            Articulos
          </h5>
          <div className="p-1 rounded grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-2 mx-2">
            <div className="justify-start col-span-3 sm:col-span-3 md:col-span-4 lg:col-span-4 rounded-xl p-1">
              {order.orderItems.map((item) => (
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
            <div className="col-span-2 sm:col-span-3 md:col-span-2 lg:col-span-2 items-center  justify-center border-l-2 border-r-2 border-gray-300 rounded-xl p-6 ">
              <div className="flex-wrap -mx-1 justify-center">
                <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
                    Articulos
                </h5>
                <p className="text-gray-700 text-base mb-4">
                    {order.itemsPrice.toFixed(2)}
                </p>
                <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
                    Compra
                </h5>
                <p className="text-gray-700 text-base mb-4">
                    {order.shippingPrice.toFixed(2)}
                </p>
                <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
                    IVA
                </h5>
                <p className="text-gray-700 text-base mb-4">
                    {order.taxPrice.toFixed(2)}
                </p>
                <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
                    Precio total de la orden
                </h5>
                <p className="text-gray-700 text-base mb-4">
                    {order.totalPrice.toFixed(2)}
                </p>
                
              </div>
            </div>
          </div>
        </div>
                </div>
            )
            };
        </div>
    )
}

export default InfOrderPage;