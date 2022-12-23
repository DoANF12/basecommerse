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

const App = () => {
  return (
    <>
      <ReactKeycloakProvider authClient={keycloak}>
        <BrowserRouter>
          <Nav className=""/>
          <main>
            <div className=" bg-slate-300 w-full h-max">
              <div>
                <Routes>
                  <Route exact path="/*" element={<WelcomePage />} />
                  <Route exact path="/books/:isbn13" element={<BooksInfo />} />
                  <Route exact path="/users/*" element={<Users />} />
                  <Route exact path="/cart/*" element={<CartPage />} />
                  <Route exact path="/signin/*" element={<SiginPage />} />
                </Routes>
              </div>
            </div>
          </main>
        </BrowserRouter>
      </ReactKeycloakProvider>
    </>
  );
};

export default App;
