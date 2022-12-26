import { useEffect } from "react";
import { useState,  useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import StepChecks from "../components/StepsChecks";

const ShippingAddressScreen = () => {
    const navigate = useNavigate();
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {
        userInfo,
        cart: {shippingAddress}
    } = state;
    const [fullName,setFullName] = useState(shippingAddress.fullName || '');
    const [address,setAddress] = useState(shippingAddress.address || '');
    const [city,setCity] = useState(shippingAddress.city    ||  '');
    const [postalCode,setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country,setCountry] = useState(shippingAddress.country || '');

    useEffect(() => {
        if(userInfo) {
            navigate('/signin?redirect=/shipping')
        }
    },[userInfo, navigate]);
    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: {
                fullName,
                address,
                city,
                postalCode,
                country,
            },
        });
        localStorage.setItem(
            'shippingAddress',
            JSON.stringify({
                fullName,
                address,
                city,
                postalCode,
                country,
            })
        );
        navigate('/payment');
    }
  return (
    <div className="container  mx-auto md:h-screen md:w-full">
    <StepChecks step1 step2></StepChecks>
    <h1 className=" font-thin text-2xl mx-8 py-2">Lista de libros</h1>
    <div className="grid justify-items-center items-center py-2 ">
      <div className="block p-6 rounded-lg shadow-lg  bg-white max-w-md container">
        <form>
          <div className="form-group mb-6">
            <label className="form-label inline-block mb-2 text-gray-700">Nombre completo</label>
            <input
              type="text"
              className="form-control block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="name"
              placeholder="Ingrese su nombre"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-6">
            <label className="form-label inline-block mb-2 text-gray-700">Dirección</label>
            <input
              type="text"
              className="form-control block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="name"
              placeholder="Ingrese su direccion"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-6">
            <label className="form-label inline-block mb-2 text-gray-700">Ciudad</label>
            <input
              type="text"
              className="form-control block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="name"
              placeholder="Ingrese su nombre"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-6">
            <label className="form-label inline-block mb-2 text-gray-700">Codigo postal</label>
            <input
              type="text"
              className="form-control block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="name"
              placeholder="Ingrese su nombre"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-6">
            <label className="form-label inline-block mb-2 text-gray-700">Pais</label>
            <input
              type="text"
              className="form-control block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="name"
              placeholder="Ingrese su nombre"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          
          <button
            type="submit"
            className="
                    w-full
                    px-6
                    py-2.5
                    bg-gradient-to-r from-stone-800 via-yellow-900 to-stone-700
                    text-white
                    font-medium
                    text-xs
                    leading-tight
                    uppercase
                    rounded
                    shadow-md
                    hover:bg-blue-700 hover:shadow-lg
                    focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                    active:bg-blue-800 active:shadow-lg
                    transition
                    duration-150
                    ease-in-out"
                onClick={submitHandler}
          >
            Send
          </button>
        </form>
      </div>
      </div>
    </div>
  );
};

export default ShippingAddressScreen;
