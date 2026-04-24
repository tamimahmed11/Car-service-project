import React from "react";
import ServiceCard from "@/components/cards/ServiceCard";
import { getServices } from "@/services/getServices";

export const metadata = {
  title: "Services",
  description: "Browse our car services",
};

const ServicesPage = async () => {
  const { services } = await getServices();

  if (services?.length <= 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">No services available</h1>
      </div>
    );
  }

  return (
    <div className="text-slate-800 mb-24">
      <div className="text-center container mx-auto py-16">
        <h3 className="text-2xl font-bold text-orange-600">Our Services</h3>
        <h2 className="text-5xl mb-4">Our Service Area</h2>
        <p>
          Explore our comprehensive range of automotive services designed to
          keep your vehicle in peak condition.
        </p>
      </div>
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {services?.length > 0 &&
          services?.map((service) => (
            <ServiceCard service={service} key={service._id} />
          ))}
      </div>
    </div>
  );
};

export default ServicesPage;
