import { Link } from "react-router-dom";
import { FaStar, FaHeart, FaEye } from "react-icons/fa";
import Rating from "./Rating";
import axios from "axios";
import { useContext } from "react";
import { Store } from "../Store";

const Card = (props) => {
  const { book } = props;
  const { state, dispatch: ctxDispach } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === book._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/books/${item._id}`);
    if (data.counInstock < quantity) {
      window.alert("Sorry. Book is out of stock");
      return;
    }
    ctxDispach({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
  };
  return (
    <>
      <div className="">
        <div className="">
          {/* {data.map((book) => ( */}
          <div
            className="p-[1.5px] my-2 mx-1 hover:scale-105 transition bg-slate-50 shadow-lgbg-white text-gray-700 w-56 min-h-[10rem] shadow-lg rounded-md overflow-hidden"
            // key={book.isbn13}
          >
            <Link
              className=" hover:text-lime-900"
              to={`/books/${book.isbn13}`}
            >
              <img
                className="h-60 w-full rounded-t-lg"
                src={book.image}
                alt={book.title}
              />
            </Link>
            <div className="p-5 flex-col gap-3">
              <div className="px-[3px] py-1">
                <div className="flex items-full gap-2">
                  <span className="px-1.5 py-0.5 text-xs rounded-md bg-slate-300">
                    si hay en stock
                  </span>
                  <span className="px-1.5 py-0.5 text-xs rounded-md bg-slate-300">
                    no
                  </span>
                </div>
              </div>

              <div className="px-[2px] py-0">
                <Link
                  className=" hover:text-lime-300"
                  to={`/books/${book.isbn13}`}
                >
                  <div className="font-bold text-xl">{book.title}</div>
                </Link>
                {/* <p className="text-gray-700 text-base">
                            {book.descripcion}
                        </p> */}
              </div>
              <div>
                <span className="text-xl font-bold">$100</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm line-through opacity-50">$1000</span>
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

              <div className="mt-2 flex gap-2">
                {book.counInstock === 0 ? (
                  <button className=" py-1 px-1 rounded text-sm bg-slate-300">
                    No hay en stock
                  </button>
                ) : (
                  <button
                    onClick={() => addCartHandler(book)}
                    className="bg-yellow-500/80 hover:bg-yellow-500/90 px-2 py-1 rounded-md text-white font-medium tracking-wider transition"
                  >
                    Add to car
                  </button>
                )}

                <button className="flex-grow flex justify-center items-center bg-gray-300/60 hover:bg-gray-300/80 transition rounded-md">
                  <FaHeart className="opacity-50"></FaHeart>
                </button>
                <button className="flex-grow flex justify-center items-center bg-gray-300/60 hover:bg-gray-300/80 transition rounded-md">
                  <FaEye className="opacity-50"></FaEye>
                </button>
              </div>
            </div>
          </div>
          {/* ))} */}
        </div>
      </div>
    </>
  );
};

export default Card;
