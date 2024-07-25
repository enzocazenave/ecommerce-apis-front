import {Routes, Route} from "react-router-dom";
import {
    HomePage,
    LoginPage,
    RegisterPage,
    ProductsPage,
    ProductPage,
    CartPage,
    OrderPage,
    CheckoutPage,
    CreateProductPage
} from "../pages";
import { Navigate } from "react-router-dom";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/products" element={<ProductsPage/>}/>
            <Route path="/products/:id" element={<ProductPage/>}/>
            <Route path="/products/new" element={<CreateProductPage/>}/>
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/cart/checkout" element={<CheckoutPage/>}/>
            <Route path="/order/:id" element={<OrderPage/>}/>
            <Route path="/*" element={<Navigate to="/" replace />}/>
        </Routes>
    );
};
