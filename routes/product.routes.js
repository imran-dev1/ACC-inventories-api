const express = require("express");
const {
   getProducts,
   getOneProduct,
   postAProduct,
   updateAProduct,
   updateBulkProduct,
} = require("../controllers/product.controller");
const router = express.Router();

router.route("/").get(getProducts).post(postAProduct);
router.route("/bulk-update").patch(updateBulkProduct);
router.route("/:id").get(getOneProduct).patch(updateAProduct);

module.exports = router;
