import axios from "axios";

// Client-side safe function for API calls only
export const getServices = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/services/api/get-all`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching services via API:", error.message);
    return { services: [] };
  }
};

export const getServicesDetails = async (id) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/services/api/${id}`
    );
    return res.data;
  } catch (error) {
    console.error(`Error fetching service details for id: ${id}`, error.message);
    return { service: null, message: "Failed to fetch service details" };
  }
};
