import { useParams } from "react-router-dom";
const BooksInfo = () => {
    const params = useParams();
    const {codigo} = params;

    return (
    <div>
        <h1 className="text-black text-4xl">{codigo}</h1>
    </div>
    );
};

export default BooksInfo;