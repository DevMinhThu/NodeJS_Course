const mongoose = require("../../common/database")();

const productSchema = mongoose.Schema({
  thumbnail: {
    type: String,
    default: null,
  },

  description: {
    type: String,
    default: null,
  },

  price: {
    type: Number,
    default: null,
  },

  status: {
    type: String,
    default: null,
  },

  featured: {
    type: Boolean,
    default: null,
  },

  promotion: {
    type: String,
    default: null,
  },

  warranty: {
    type: String,
    default: null,
  },

  accessories: {
    type: String,
    default: null,
  },

  is_stock: {
    type: Boolean,
    default: null,
  },

  name: {
    type: String,
    default: null,
  },

  slug: {
    type: String,
    default: null,
  },

  createdAt: {
    type: Date,
    default: null,
  },

  updatedAt: {
    type: Date,
    default: null,
  },
});

// chuyển thành model
const productModel = mongoose.model("productModel", productSchema, "products");

module.exports = productModel;
