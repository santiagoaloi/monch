import "./Colors.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";

import { Home } from "./pages/home/Home";
import { Header } from "./components/Header";
import { Register } from "./pages/auth/Register";
import { SignIn } from "./pages/auth/SignIn";
import { Account } from "./pages/account/Account";
import { Restaurant } from "./pages/restaurant/Restaurant";
import { Footer } from "./components/Footer";

import { AuthContextProvider } from "./contexts/AuthContext";

function App() {
  return (
    <div className="h-100">
      <AuthContextProvider>
        <div className="flex flex-col justify-between h-100">
          <div>
            <Header />
            <div className="container">
              <Routes>
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.REGISTER} element={<Register />} />
                <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
                <Route path={ROUTES.RESTAURANT} element={<Restaurant />} />
                <Route path={ROUTES.ACCOUNT} element={<Account />} />
              </Routes>
            </div>
          </div>
          <Footer />
        </div>
      </AuthContextProvider>
    </div>
  );
}

export default App;
