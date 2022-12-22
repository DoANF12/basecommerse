const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="w-20 h-20 border-t-4 border-b-4 border-green-900 rounded-full animate-spin"></div>
      <span className=" mx-4 text-xl font-thin">Cargando...</span>
    </div>
  );
};

export default Loading;
