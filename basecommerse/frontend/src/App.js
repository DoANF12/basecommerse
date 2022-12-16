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

const App = () => {
  return (
    <>
      <ReactKeycloakProvider authClient={keycloak}>
        <BrowserRouter>
          <Nav />
          <main>
            <div className="py-16 xl:py-20 lg:py-20 bg-yellow-900 w-full h-screen">
              <div>
                <Routes>
                  <Route exact path="/*" element={<WelcomePage />} />
                  <Route exact path="/books/:codigoISBN" element={<BooksInfo />} />
                  <Route exact path="/users/*" element={<Users />} />
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
