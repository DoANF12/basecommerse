import {FaSignInAlt,FaShippingFast,FaCheckSquare} from 'react-icons/fa'
import { MdPayment } from "react-icons/md";

const StepChecks = (props) => {
  return (
    <div className="w-full py-6">
      <div className="flex">
        <div className="w-1/4">
          <div className="mb-2">
            <div className={`w-10  h-10 mx-auto rounded-full text-lg text-white flex items-center ${props.step1 ? 'bg-green-500':' bg-orange-600'}`}>
              <span className="text-center mx-3 text-white w-full">
                <FaSignInAlt></FaSignInAlt>
              </span>
            </div>
          </div>

          <div className="text-xs text-center md:text-base">Inicio de sesion</div>
        </div>

        <div className="w-1/4">
          <div className="mb-2">
            <div className={`w-10 h-10 mx-auto rounded-full text-lg text-white flex items-center ${props.step2 ? 'bg-green-500':' bg-orange-600'}`}>
              <span className="text-center mx-2.5 text-white w-full">
                <FaShippingFast></FaShippingFast>
              </span>
            </div>
          </div>

          <div className="text-xs text-center md:text-base">Envío</div>
        </div>

        <div className="w-1/4">
          <div className="mb-2">
            <div className={`w-10 h-10 mx-auto rounded-full text-lg text-white flex items-center ${props.step3 ? 'bg-green-500':' bg-orange-600'}`}>
              <span className="text-center mx-2.5 text-gray-600 w-full">
                <MdPayment></MdPayment>
              </span>
            </div>
          </div>

          <div className="text-xs text-center md:text-base">Pago</div>
        </div>

        <div className="w-1/4">
          <div className="mb-2">
            <div className={`w-10 h-10 mx-auto rounded-full text-lg text-white flex items-center ${props.step4 ? 'bg-green-500':' bg-orange-600'}`}>
              <span className="text-center mx-2.5 text-gray-600 w-full">
                <FaCheckSquare></FaCheckSquare>
              </span>
            </div>
          </div>

          <div className="text-xs text-center md:text-base">Realizar pedido</div>
        </div>
      </div>
    </div>
  );
};

export default StepChecks;
