import { readFileSync } from "fs";
import { join } from "path";

export const getServiceFromFile = (id) => {
  try {
    const filePath = join(process.cwd(), "public", "services.json");
    const fileContents = readFileSync(filePath, "utf8");
    const services = JSON.parse(fileContents);
    const service = services.find(s => s._id === id);
    return service || null;
  } catch (error) {
    console.error("Error reading services file:", error);
    return null;
  }
};

export const getAllServicesFromFile = () => {
  try {
    const filePath = join(process.cwd(), "public", "services.json");
    const fileContents = readFileSync(filePath, "utf8");
    const services = JSON.parse(fileContents);
    return services || [];
  } catch (error) {
    console.error("Error reading services file:", error);
    return [];
  }
};
