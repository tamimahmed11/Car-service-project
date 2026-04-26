"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { IoClose } from "react-icons/io5";

const SearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allServices, setAllServices] = useState([]);

  // Load all services on mount
  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/services/api/get-all`
        );
        setAllServices(res.data?.services || []);
      } catch (error) {
        console.error("Failed to load services:", error);
      }
    };
    loadServices();
  }, []);

  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    const filtered = allServices.filter((service) =>
      service.title.toLowerCase().includes(query.toLowerCase()) ||
      service.description?.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4 animate-fade-in">
        {/* Search Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-900">Search Services</h2>
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost"
          >
            <IoClose className="text-xl" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b">
          <input
            type="text"
            placeholder="Search services by name or description..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="input input-bordered w-full focus:outline-none"
            autoFocus
          />
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto">
          {isLoading && (
            <div className="p-8 text-center">
              <div className="loading loading-spinner"></div>
            </div>
          )}

          {!isLoading && searchQuery && searchResults.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <p>No services found matching &quot;{searchQuery}&quot;</p>
            </div>
          )}

          {!isLoading && searchResults.length > 0 && (
            <div className="divide-y">
              {searchResults.map((service) => (
                <Link
                  key={service._id}
                  href={`/services/${service._id}`}
                  onClick={onClose}
                >
                  <div className="p-4 hover:bg-gray-50 transition cursor-pointer flex gap-4">
                    <div className="flex-shrink-0 w-20 h-20 relative">
                      <Image
                        src={service.img}
                        alt={service.title}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {service.description}
                      </p>
                      <p className="text-primary font-bold mt-2">
                        ${service.price}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!isLoading && !searchQuery && (
            <div className="p-8 text-center text-gray-500">
              <p>Type to search for services...</p>
            </div>
          )}
        </div>

        {/* Results Count */}
        {searchQuery && searchResults.length > 0 && (
          <div className="px-4 py-3 border-t bg-gray-50 text-sm text-gray-600">
            Found {searchResults.length} service{searchResults.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
