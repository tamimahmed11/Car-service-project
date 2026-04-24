"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const router = useRouter();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 mb-8">
            Add some services to get started!
          </p>
          <Link href="/services">
            <button className="btn btn-primary">Continue Shopping</button>
          </Link>
        </div>
      </div>
    );
  }

  const totalPrice = getTotalPrice();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 p-6 border-b last:border-b-0 hover:bg-gray-50 transition"
                >
                  {/* Product Image */}
                  <div className="flex-shrink-0 w-24 h-24 relative">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-primary font-bold">
                      ${item.price} each
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity - 1)
                      }
                      className="btn btn-sm btn-ghost"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1)
                      }
                      className="btn btn-sm btn-ghost"
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right w-24">
                    <p className="text-lg font-bold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => {
                      removeFromCart(item._id);
                      toast.info(`${item.title} removed from cart`);
                    }}
                    className="btn btn-sm btn-ghost btn-error"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-6">
              <Link href="/services">
                <button className="btn btn-outline btn-primary">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              {/* Items Count */}
              <div className="flex justify-between mb-4 pb-4 border-b">
                <span className="text-gray-600">Items ({cartItems.length})</span>
                <span className="font-semibold">
                  ${cartItems
                    .reduce((sum, item) => sum + item.price * item.quantity, 0)
                    .toFixed(2)}
                </span>
              </div>

              {/* Subtotal */}
              <div className="flex justify-between mb-2 text-gray-600">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              {/* Tax (10%) */}
              <div className="flex justify-between mb-2 text-gray-600">
                <span>Tax (10%)</span>
                <span>${(totalPrice * 0.1).toFixed(2)}</span>
              </div>

              {/* Shipping */}
              <div className="flex justify-between mb-4 pb-4 border-b text-gray-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              {/* Total */}
              <div className="flex justify-between mb-6 text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">
                  ${(totalPrice * 1.1).toFixed(2)}
                </span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  router.push("/checkout");
                  toast.info("Proceeding to checkout...");
                }}
                className="btn btn-primary w-full mb-2"
              >
                Proceed to Checkout
              </button>

              {/* Clear Cart Button */}
              <button
                onClick={() => {
                  clearCart();
                  toast.info("Cart cleared");
                }}
                className="btn btn-outline btn-error w-full"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
