import "./App.css";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import WelcomePage from "./pages/Homepage";
// import SecuredPage from "./pages/SecuredPage";
import Users from "./pages/Users";
// import PrivateRoute from "./helpers/PrivateRoute";
import BooksInfo from "./pages/BooksInfo";
import CartPage from "./pages/CartPage"
import SiginPage from "./pages/SigninPage"
import SignupPage from "./pages/SignupPage"
import ShippingAddressScreen from "./pages/ShippingAdressScreen";

const App = () => {
  return (
    <>
      {/* <ReactKeycloakProvider authClient={keycloak}> */}
        <BrowserRouter>
          <Nav className=""/>
          <main>
            <div className=" bg-slate-300 w-full h-screen sm:h-max md:h-max lg:h-max xl:h-max">
              <div>
                <Routes>
                  <Route exact path="/*" element={<WelcomePage />} />
                  <Route exact path="/books/:isbn13" element={<BooksInfo />} />
                  <Route exact path="/users" element={<Users />} />
                  <Route exact path="/cart" element={<CartPage />} />
                  <Route exact path="/signin" element={<SiginPage />} />
                  <Route exact path="/signup" element={<SignupPage />} />
                  <Route exact path="/shipping" element={<ShippingAddressScreen/>}/>
                </Routes>
              </div>
            </div>
          </main>
        </BrowserRouter>
      {/* </ReactKeycloakProvider> */}
    </>
  );
};

export default App;
