const Product = require("../models/product");

module.exports = {
  getAddProduct: async (req, resp, next) => {
    var id = req.params.id;
    const product = id && (await Product.findById(id));
    return resp.render("admin/edit-product", {
      title: product ? product.title : "Add Product",
      path: "/admin/product",
      product: product
    });
  },
  postAddProduct: async (req, resp, next) => {
    id = req.params.id;
    const doc = req.body;
    if (req.file){
      doc.imageUrl = req.file? req.file.path : null;
    }
    let product;
    if (id) {
      product = await Product.findById(id);
      product.title = doc.title;
      product.description = doc.description;
      product.price = doc.price;
      product.imageUrl = doc.imageUrl
    } else {
      product = new Product(doc);
    }
    await product.save();
    resp.redirect("/admin/products");
  },
  getProducts: async (req, resp, next) => {
    const products = await Product.find({});
    products.forEach(p => p.id = p._id.toString());
    resp.render("shop/products-list", {
      title: "All products",
      path: "/products",
      products
    });
  },
  getAdminProducts: async (req, resp, next) => {
    const products = await Product.find({});
    products.forEach(p => (p.id = p._id.toString()));
    resp.render("admin/products", {
      products: products,
      title: "Admin products",
      path: "/admin/products",
    });
  },
  deleteProduct: async (req, resp, next) => {
    const id = req.params.id;
    await Product.findByIdAndDelete(id);
    return resp.redirect("/admin/products");
  },
  getProductDetails: async (req, resp, next) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    product.id = product._id.toString();
    return resp.render("shop/product-details", {
      title: product.title,
      path: "/products",
      product: product,
    });
  }
};
