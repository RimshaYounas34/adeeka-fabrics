import { useState } from "react";
import BASE_URL from "../api.js";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/newsletter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message);
        return;
      }

      setMessage("Subscribed successfully!");
      setEmail("");

    } catch (error) {
      console.log(error);
      setMessage("Something went wrong");
    }
  };

  return (
    <section className="bg-charcoal text-cream py-14 px-6">
      
      <div className="max-w-2xl mx-auto text-center">

        <h2 className="font-display text-2xl md:text-3xl mb-2">
          Join The Adeeka World
        </h2>

        <p className="font-elegant text-cream/60 mb-7">
          Get updates about new arrivals, offers and more.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >

          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="
              bg-transparent
              border
              border-cream/30
              px-5
              py-3
              text-sm
              flex-1
              max-w-sm
              focus:outline-none
              focus:border-gold
            "
          />

          <button
            type="submit"
            className="
              bg-gold
              text-charcoal
              px-8
              py-3
              text-xs
              tracking-widest
              uppercase
              hover:bg-goldlight
            "
          >
            Subscribe
          </button>

        </form>

        {message && (
          <p className="text-sm text-gold mt-4">
            {message}
          </p>
        )}

      </div>

    </section>
  );
}