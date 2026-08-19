
const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Get Products
export const getProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`);

    if (!response.ok) {
      throw new Error("Failed to get products");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Product Error:", error);
    return [];
  }
};

export default BASE_URL;
