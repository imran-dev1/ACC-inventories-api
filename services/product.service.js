const Product = require("../models/Product");

exports.getProductsService = async (filter, queries) => {
   const products = await Product.find(filter)
      .skip(queries.skip)
      .limit(queries.limit)
      .select(queries.fields)
      .sort(queries.sortBy);
   const total = await Product.countDocuments(filter);
   const pageCount = Math.ceil(total / queries.limit);
   return { total, pageCount, products };
};

exports.getOneProductService = async (id) => {
   const product = await Product.find({ _id: id });
   return product;
};

exports.postAProductService = async (data) => {
   const output = await data.save();
   return output;
};

exports.updateAProductService = async (id, data) => {
   const output = await Product.updateOne(
      { _id: id },
      { $set: data },
      { runValidators: true }
   );

   return output;
};

exports.updateBulkProductService = async (data) => {
   const products = [];
   data.data.forEach((product) => {
      products.push(Product.updateOne({ _id: product.id }, product.details));
   });
   const result = await Promise.all(products);
   return result;
};
