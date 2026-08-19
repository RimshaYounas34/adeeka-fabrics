import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      uid: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },

    customer: {
      fullName: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },

      postalCode: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },
    },

    items: [
      {
        product: {
          type: String,
          required: true,
        },

        name: {
          type: String,
          required: true,
        },

        image: String,

        price: {
          type: Number,
          required: true,
        },

        qty: {
          type: Number,
          required: true,
        },

        size: String,
        color: String,
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      default: "Processing",
      enum: [
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
    },

    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;