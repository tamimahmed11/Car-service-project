"use client";

import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CheckoutPage() {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!session?.user?.email) {
      toast.error("Please log in to checkout");
      router.push("/login");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsLoading(true);

    const bookingData = {
      email: session.user.email,
      name: session.user.name,
      address: e.target.address.value,
      phone: e.target.phone.value,
      date: e.target.date.value,
      items: cartItems.map((item) => ({
        serviceID: item._id,
        serviceTitle: item.title,
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice: getTotalPrice(),
      totalQuantity: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    };

    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || ""}/checkout/api/new-booking`,
        {
          method: "POST",
          body: JSON.stringify(bookingData),
          headers: {
            "content-type": "application/json",
          },
        }
      );

      const response = await resp?.json();

      if (response?.success || response?.message) {
        toast.success(response?.message || "Booking confirmed!");
        clearCart();
        setTimeout(() => {
          router.push("/my-bookings");
        }, 1500);
      } else {
        toast.error(response?.error || "Booking failed");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("An error occurred during checkout");
    } finally {
      setIsLoading(false);
    }
  };

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Please Log In
          </h1>
          <p className="text-gray-600 mb-8">
            You need to be logged in to checkout.
          </p>
          <button
            onClick={() => router.push("/login")}
            className="btn btn-primary"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 mb-8">
            Add some services before checking out.
          </p>
          <button
            onClick={() => router.push("/services")}
            className="btn btn-primary"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const totalPrice = getTotalPrice();
  const taxAmount = totalPrice * 0.1;
  const finalAmount = totalPrice + taxAmount;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Complete Your Order
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-8">
            <form onSubmit={handleCheckout} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Name</span>
                    </label>
                    <input
                      type="text"
                      value={session?.user?.name || ""}
                      readOnly
                      className="input input-bordered bg-gray-100"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Email</span>
                    </label>
                    <input
                      type="email"
                      value={session?.user?.email || ""}
                      readOnly
                      className="input input-bordered bg-gray-100"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Information */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Delivery Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Phone *</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Your phone number"
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Date *</span>
                    </label>
                    <input
                      type="date"
                      name="date"
                      className="input input-bordered"
                      required
                    />
                  </div>
                </div>
                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text font-semibold">Address *</span>
                  </label>
                  <textarea
                    name="address"
                    placeholder="Your address"
                    className="textarea textarea-bordered"
                    rows="3"
                    required
                  ></textarea>
                </div>
              </div>

              {/* Order Items Summary */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Order Summary
                </h2>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between items-center py-2 border-b last:border-b-0"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">
                          {item.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-bold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full btn-lg"
              >
                {isLoading ? "Processing..." : "Confirm Order"}
              </button>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Order Total
              </h2>

              <div className="space-y-4 mb-6 pb-6 border-b">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (10%)</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
                <span>Total</span>
                <span className="text-primary">${finalAmount.toFixed(2)}</span>
              </div>

              {/* Items Count */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">{cartItems.length}</span> items
                  in your order
                </p>
              </div>

              <button
                onClick={() => router.back()}
                className="btn btn-outline btn-primary w-full"
              >
                Back to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
