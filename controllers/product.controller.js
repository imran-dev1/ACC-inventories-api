const Product = require("../models/Product");
const {
   getProductsService,
   getOneProductService,
   postAProductService,
   updateAProductService,
   updateBulkProductService,
} = require("../services/product.service");

exports.getProducts = async (req, res, next) => {
   try {
      let filterObj = { ...req.query };
      const excludeFields = ["sort", "limit", "page"];
      excludeFields.forEach((field) => {
         delete filterObj[field];
      });

      let filterString = JSON.stringify(filterObj);

      filterString = filterString.replace(
         /\b(gt|lt|gte|lte)\b/g,
         (match) => `$${match}`
      );
      filterObj = JSON.parse(filterString);

      const queries = {};
      if (req.query.sort) {
         const sort = req.query.sort;
         queries.sortBy = sort.split(",").join(" ");
      }
      if (req.query.fields) {
         const fields = req.query.fields;
         queries.fields = fields.split(",").join(" ");
      }
      if (req.query.page) {
         const { page = 1, limit = 10 } = req.query;
         const skip = (page - 1) * +limit;
         queries.page = +page;
         queries.limit = +limit;
         queries.skip = skip;
      }
      const result = await getProductsService(filterObj, queries);
      res.status(200).json({
         status: "success",
         data: result,
      });
   } catch (error) {
      res.status(400).json({
         status: "fail",
         error: error.message,
      });
   }
};

exports.getOneProduct = async (req, res, next) => {
   try {
      const id = req.params.id;
      const result = await getOneProductService(id);
      res.status(200).json({
         status: "success",
         data: result,
      });
   } catch (error) {
      res.status(400).json({
         status: "fail",
         error: error.message,
      });
   }
};

exports.postAProduct = async (req, res, next) => {
   try {
      const product = new Product(req.body);

      const data = await postAProductService(product);

      //    data.printName();

      res.status(200).json({
         status: "success",
         message: "Product saved successfully",
         data,
      });
   } catch (error) {
      res.status(400).json({
         status: "fail",
         error: error.message,
      });
   }
};

exports.updateAProduct = async (req, res, next) => {
   try {
      const id = req.params.id;
      const result = await updateAProductService(id, req.body);
      res.status(200).json({
         status: "success",
         data: result,
      });
   } catch (error) {
      res.status(400).json({
         status: "fail",
         error: error.message,
      });
   }
};

exports.updateBulkProduct = async (req, res, next) => {
   try {
      const data = req.body;
      console.log(data);
      const result = await updateBulkProductService(data);
      res.status(200).json({
         status: "success",
         data: result,
      });
   } catch (error) {
      res.status(400).json({
         status: "fail",
         error: error.message,
      });
   }
};
