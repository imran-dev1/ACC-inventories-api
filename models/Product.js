const mongoose = require("mongoose");

// Schema Design

const productSchema = mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, "Please provide the name of the product."],
         trim: true,
         unique: true,
         minLength: [3, "Name must be at least 3 characters."],
         maxLength: [100, "Name is too long."],
      },
      description: {
         type: String,
         required: [true, "Please provide the description of the product."],
      },
      price: {
         type: Number,
         required: [true, "Please provide the price of the product."],
         min: [0, "Price can't be negative."],
      },
      unit: {
         type: String,
         required: true,
         enum: {
            values: ["kg", "litre", "pcs"],
            message: `Unit value can't be {value}, must be kg/litre/pcs`,
         },
      },
      quantity: {
         type: Number,
         required: true,
         min: [0, "Quantity can't be negative"],
         validate: {
            validator: (value) => {
               const isInteger = Number.isInteger(value);
               if (isInteger) {
                  return true;
               } else {
                  return false;
               }
            },
         },
         message: "Quantity must be an Integer",
      },
      status: {
         type: String,
         required: true,
         enum: {
            values: ["in-stock", "out-of-stock"],
            message: `Status can't be {value}`,
         },
      },
      //   supplier: {
      //      type: mongoose.Schema.Types.ObjectId,
      //      ref: "Supplier",
      //   },
      //   categories: [
      //      {
      //         name: {
      //            type: String,
      //            required: true,
      //         },
      //         _id: mongoose.Schema.Types.ObjectId,
      //      },
      //   ],
   },
   {
      timestamps: true,
   }
);

//productSchema middleware

productSchema.pre("save", function (next) {
   if (this.quantity === 0) {
      this.status = "out-of-stock";
   }
   next();
});

//instance methods

// productSchema.methods.printName = function () {
//     console.log(this.name);
//  }

//Model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
