import Newsletter from "../models/Newsletter.js";

export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const existingEmail = await Newsletter.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
        message: "This email is already subscribed",
      });
    }

    const subscriber = await Newsletter.create({
      email,
    });

    res.status(201).json({
      message: "Subscribed successfully",
      subscriber,
    });

  } catch (error) {
    console.log("Newsletter Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};