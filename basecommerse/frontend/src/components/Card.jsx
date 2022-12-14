import { Link } from "react-router-dom";

  export default function card({date}) {
    return (
        <>
        <div class="columns-4  ">
        {
        date.books.map(product => (
            <div class="p-[1.5px] mx-2 bg-yellow-700 rounded overflow-hidden shadow-lg" key={product.codigoISBN}>
                <Link to={`/books/${product.codigoISBN}`}>
                    <img class="h-60 w-full rounded-t-lg" src={product.image} alt={product.titulo} />
                </Link>
                <div class="px-[2px] py-0">
                <Link to={`/books/${product.codigoISBN}`}>
                    <div class="font-bold text-xl mb-2">{product.titulo}</div>
                </Link>
                <p class="text-gray-700 text-base">
                    {product.descripcion}
                </p>
                </div>
                <div class="px-[2px] pt-1 pb-1">
                <p><strong>${product.precio}</strong></p>
                <button>Añadir al carrito</button>
                </div>
            </div>   
            
        ))
     }
        </div> 
      </>
    );
  }