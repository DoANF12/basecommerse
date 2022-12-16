import { Link } from "react-router-dom";
import { FaStar, FaHeart, FaEye } from "react-icons/fa";
import Rating from './Rating'

export default function card({ data }) {
  return (
    <>
      <div className="">
        <div className="flex flex-wrap -mx-1 lg:-mx-4 justify-center">
          {data.map((book) => (
            <div
              className="p-[1.5px] my-2 mx-2 bg-slate-50 shadow-lgbg-white text-gray-700 w-72 min-h-[10rem] shadow-lg rounded-md overflow-hidden"
              key={book.codigoISBN}
            >
              <Link to={`/books/${book.codigoISBN}`}>
                <img
                  className="h-60 w-full rounded-t-lg"
                  src={book.image}
                  alt={book.titulo}
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
                    <Link to={`/books/${book.codigoISBN}`}>
                    <div className="font-bold text-xl">{book.titulo}</div>
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
                    <Rating rating={book.rating} numReviews={book.numReviews}></Rating>
                </span>

                <div className="mt-2 flex gap-2">
                    {/* <p><strong>${book.precio}</strong></p> */}
                    <button className="bg-yellow-500/80 hover:bg-yellow-500/90 px-2 py-1 rounded-md text-white font-medium tracking-wider transition">
                    Add to car
                    </button>
                    <button className="flex-grow flex justify-center items-center bg-gray-300/60 hover:bg-gray-300/80 transition rounded-md">
                    <FaHeart className="opacity-50"></FaHeart>
                    </button>
                    <button className="flex-grow flex justify-center items-center bg-gray-300/60 hover:bg-gray-300/80 transition rounded-md">
                    <FaEye className="opacity-50"></FaEye>
                    </button>
                </div>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
