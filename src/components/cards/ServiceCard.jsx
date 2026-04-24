"use client";

import Image from "next/image";
import React from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { toast } from "react-toastify";

const ServiceCard = ({ service }) => {
  const { title, img, price, _id } = service || {};
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(service);
    toast.success(`${title} added to cart!`);
  };

  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <figure className="overflow-hidden h-[30vh]">
        <Image height={240} width={640} src={img} alt={title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div className="card-actions justify-between items-center flex-col gap-2">
          <h6 className="text-primary font-semibold w-full">Price : ${price}</h6>
          <div className="flex gap-2 w-full">
            <Link href={`/services/${_id}`} className="flex-1">
              <button className="btn btn-primary w-full btn-sm">
                View Details
              </button>
            </Link>
            <button
              onClick={handleAddToCart}
              className="btn btn-outline btn-primary btn-sm flex-1"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
