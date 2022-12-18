import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main class="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
      <h1 class="text-9xl font-extrabold text-white tracking-widest">404</h1>
      <div class=" bg-lime-300 px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <button class="mt-5">
        <a class="relative inline-block text-sm font-medium text-lime-300 group active:text-orange-500 focus:outline-none focus:ring">
          <span class=" hover:scale-105 transition relative block px-8 py-3 bg-[#1A2238] border border-current">
            <Link to="/">Go Home</Link>
          </span>
        </a>
      </button>
    </main>
  );
};

export default NotFound;
