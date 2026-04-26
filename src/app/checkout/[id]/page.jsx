"use client";
import { getServicesDetails } from "@/services/getServices";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";

const Checkout = ({ params }) => {
    const {data} = useSession();
    const [ service, setService ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    
    const loadService = useCallback(async () => {
      try {
        setLoading(true);
        setError(null);
        const details = await getServicesDetails(params.id);
        
        if (details?.service) {
          setService(details.service);
        } else {
          setError("Service not found");
          setService(null);
        }
      } catch (err) {
        console.error("Error loading service:", err);
        setError("Failed to load service details");
        setService(null);
      } finally {
        setLoading(false);
      }
    }, [params.id]);
    
    const { _id, title, description, img, price, facility } = service || {};

    const handleBooking = async (event) => {
      event.preventDefault();
      
      if (!service) {
        toast.error("Service details not loaded. Please try again.");
        return;
      }
      
      const newBooking = { 
          email : data?.user?.email,
          name : data?.user?.name,
          address : event.target.address.value,
          phone : event.target.phone.value,
          date : event.target.date.value,
          serviceTitle : title,
          serviceID : _id,
          price : price,
      }

      try {
        const resp = await fetch('/checkout/api/new-booking', {
          method: 'POST',
          body: JSON.stringify(newBooking),
          headers : {
              "content-type" : "application/json"
          }
        });
        const response = await resp?.json();
        if (response?.success) {
          toast.success(response?.message || 'Booking successful!');
          event.target.reset();
        } else {
          toast.error(response?.message || 'Booking failed');
        }
      } catch (error) {
        console.error('Booking error:', error);
        toast.error('Failed to create booking');
      }
    };

    useEffect(() => {
      loadService();
    }, [params.id]);

  return (
    <div className="container mx-auto">
      <ToastContainer/>
      
      {loading && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="loading loading-spinner loading-lg"></div>
            <p className="mt-4 text-lg">Loading service details...</p>
          </div>
        </div>
      )}
      
      {error && !loading && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="alert alert-error max-w-md">
            <div>
              <span>{error}</span>
            </div>
          </div>
        </div>
      )}
      
      {!loading && !error && service && (
      <>
      <div className="relative  h-72">
        {img && (
        <Image
          className="absolute h-72 w-full left-0 top-0 object-cover"
          src={img}
          alt="service"
          width={1920}
          height={1080}
          style={{ width: "90vw" }}
        />
        )}
        <div className="absolute h-full left-0 top-0 flex items-center justify-center bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)] ">
          <h1 className="text-white text-3xl font-bold flex justify-center items-center ml-8">
            Checkout {title}
          </h1>
        </div>
      </div>
      <div className="my-12 bg-slate-300 p-12">
        <form onSubmit={handleBooking}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input defaultValue={data?.user?.name}  type="text" name="name" className="input input-bordered" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <input defaultValue={new Date().getDate()} type="date" name="date" className="input input-bordered" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
              defaultValue={data?.user?.email}
                type="text"
                name="email"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Due amount</span>
              </label>
              <input
              defaultValue={price}
              readOnly
                type="text"
                name="price"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
              required
                type="text"
                name="phone"
                placeholder="Your Phone"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Present Address</span>
              </label>
              <input
                type="text"
                name="address"
                placeholder="Your Address"
                className="input input-bordered"
              />
            </div>
          </div>
          <div className="form-control mt-6">
            <input
              className="btn btn-primary btn-block"
              type="submit"
              value="Order Confirm"
            />
          </div>
        </form>
      </div>
      </>
      )}
    </div>
  );
};

export default Checkout;
