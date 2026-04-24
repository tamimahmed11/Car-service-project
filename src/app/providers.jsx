"use client";

import { CartProvider } from "@/context/CartContext";
import AuthProvider from "@/services/AuthProvider";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Providers({ children }) {
  return (
    <>
      <ToastContainer />
      <AuthProvider>
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </AuthProvider>
    </>
  );
}
