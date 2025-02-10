import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Global/Navbar";
import Home from "./Components/Global/Home";
import Footer from "./Components/Global/Footer";
import Register from "./Components/Authentication/Register";
import Login from "./Components/Authentication/Login";
import NotFound from "./Components/Global/NotFound";
import ProductDetails from "./Components/Global/ProductDetails";
import ForgetPassword from "./Components/Authentication/ForgetPassword";
import RoutesProtector from "./Components/Global/RoutesProtector";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartProvider from "./Contexts/CartContext";
import UserProvider from "./Contexts/UserContext";
import { Toaster } from 'react-hot-toast';
import Cart from "./Components/User/Cart";
import CheckOut from "./Components/User/CheckOut";
import AllOrders from "./Components/User/AllOrders";
import GlobalProvider from "./Contexts/GlobalContext";
import Breadcrumbs from "./Components/Global/Helper/Breadcrumbs";
import Wishlist from "./Components/User/Wishlist";
import ThemeProvider from './Contexts/ThemeContext';
import Categories from "./Components/Global/Categories";
import Products from "./Components/Global/Products";
import Brands from "./Components/Global/Brands";

function App() {
  const queryClient = new QueryClient();
  return (
    <ThemeProvider>
      <Router>
        <UserProvider>
          <CartProvider>
            <GlobalProvider>
              <div className="relative flex flex-col justify-between min-h-screen text-[var(--text-primary)] bg-[var(--bg-primary)] transition-colors duration-200">
                <Navbar />
                <QueryClientProvider client={queryClient}>
                  <div className="max-w-8xl mx-[3rem]">
                    <Breadcrumbs />
                    <Toaster position="bottom-right" reverseOrder={false} />
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/login" element={<RoutesProtector routeName="login"><Login /></RoutesProtector>} />
                      <Route path="/register" element={<RoutesProtector routeName="register"><Register /></RoutesProtector>} />
                      <Route path="/forgetpassword" element={<RoutesProtector routeName="forgetpassword"><ForgetPassword /></RoutesProtector>} />
                      <Route path="/cart" element={<RoutesProtector routeName="cart"><Cart /></RoutesProtector>} />
                      <Route path="/checkout" element={<RoutesProtector routeName="checkout"><CheckOut /></RoutesProtector>} />
                      <Route path="/allorders" element={<RoutesProtector routeName="allorders"><AllOrders /></RoutesProtector>} />
                      <Route path="/wishlist" element={<RoutesProtector routeName="wishlist"><Wishlist /></RoutesProtector>} />
                      <Route path="/categories" element={<Categories />} />
                      <Route path="/brands" element={<Brands />} />
                      <Route path="/productdetails/:productID" element={<ProductDetails />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/products/:categorySlug" element={<Products />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </div>
                  <Footer />
                </QueryClientProvider>
              </div>
            </GlobalProvider>
          </CartProvider>
        </UserProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
