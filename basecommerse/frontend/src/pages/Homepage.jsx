import React from "react";
// import date from '../data';
import { useEffect } from "react";
import Card from "../components/Card";
import axios from "axios";
import { useReducer } from "react";
import logger from "use-reducer-logger";
import Loading from "../components/Loading";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, books: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const Home = () => {
  const [{ loading, error, books }, dispatch] = useReducer(logger(reducer), {
    books: [],
    loading: true,
    error: "",
  });
  //const [data,setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    dispatch({ type: "FETCH_REQUEST" });
    try {
      const result = await axios.get("/api/books");
      dispatch({ type: "FETCH_SUCCESS", payload: result.data });
    } catch (err) {
      dispatch({ type: "FETCH_FAIL", payload: err.message });
    }

    // setData(result.data)
  };
  return (
    <div>
      <div className=" bg-slate-200 py-10"></div>
      <h1 className=" font-thin text-2xl mx-8 py-2">Lista de libros</h1>
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="container mx-auto px-10 md:px-10 lg:px-7">
          <div className="flex flex-wrap -mx-1 lg:-mx-4 justify-center">
            {books.map((book) => (
              <>
                <div key={book.isbn13}>
                  <Card
                    className="p-[1.5px] my-2 mx-1 hover:scale-105 transition bg-slate-50 shadow-lgbg-white text-gray-700 w-56 min-h-[10rem] shadow-lg rounded-md overflow-hidden"                
                    book={book}
                  ></Card>
                </div>
              </>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
