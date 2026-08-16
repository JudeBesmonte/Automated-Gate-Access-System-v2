import axios from "axios";

const PAYMONGO_SECRET_KEY = process.env.PAYMONGO_SECRET_KEY;

/**
 * Fetch a payment method from PayMongo
 * @param paymentMethodId The ID of the payment method to fetch
 * @returns {Promise<any>} A promise that resolves to the fetched payment method
 */
export const fetchPaymentMethod = async (paymentMethodId: string): Promise<unknown> => {
  if (!PAYMONGO_SECRET_KEY) {
    throw new Error("PAYMONGO_SECRET_KEY is not set in the environment variables.");
  }

  try {
    const response = await axios.get(
      `https://api.paymongo.com/v1/payment_methods/${paymentMethodId}`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(PAYMONGO_SECRET_KEY + ":").toString("base64")}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error fetching payment method:", error.response.data);
    } else {
      console.error("Error fetching payment method:", (error as Error).message);
    }
    throw new Error("Failed to fetch payment method.");
  }
};