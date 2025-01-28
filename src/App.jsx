import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import Register from "./Components/Register";
import Login from "./Components/Login";
import NotFound from "./Components/NotFound";
import UserProvider from "./Contexts/UserContext";
import ProductDetails from "./Components/ProductDetails";
import ForgetPassword from "./Components/ForgetPassword";
import RoutesProtector from "./Components/RoutesProtector";
import MyProductsProvider from "./Contexts/MyProductsContext";

function App() {
  return (
    <>
      <Router>
        <UserProvider>
          <MyProductsProvider>
            <div className="relative flex flex-col justify-between min-h-screen text-white">
              <Navbar />
              <div className="pt-[1%]">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<RoutesProtector><Login></Login></RoutesProtector>} />
                  <Route path="/register" element={<RoutesProtector><Register></Register></RoutesProtector>} />
                  <Route path="/forgetpassword" element={<RoutesProtector><ForgetPassword></ForgetPassword></RoutesProtector>} />
                  <Route path="/productdetails" element={<RoutesProtector><ProductDetails></ProductDetails></RoutesProtector>} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
              </div>
            </div>
          </MyProductsProvider>
        </UserProvider>
      </Router>
    </>
  );
}

export default App;
