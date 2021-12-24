const mongoose = require("mongoose");
// This is used for accessing our environemnt variables.
require("dotenv").config();

// Database connection
mongoose.connect(
  `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@pricetracker-shard-00-00.f9njy.mongodb.net:27017,pricetracker-shard-00-01.f9njy.mongodb.net:27017,pricetracker-shard-00-02.f9njy.mongodb.net:27017/priceTracker?ssl=true&replicaSet=atlas-11qc0i-shard-0&authSource=admin&retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection ERROR!😡"));
db.once("open", function () {
  console.log("Database connected.🥳");
});

// Creating Schemas.
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price_history: [
    {
      price: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        required: true,
        default: Date.now,
      },
    },
  ],
});

const scrapeSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  params: {
    name: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  }
});


const requestSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    requried: true,
  },
  link: {
    type: String,
    requried: true,
  }
});

const monitorSchema = new mongoose.Schema({
  productID: {
    type: String,
    required: true
  },
  minDesiredPrice: {
    type: Number,
    required: true
  },
  nextTime: {
    type: String,
    required: true
  },
  emailTo: {
    type: String,
    required: true
  },
  increaseNext: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
});

module.exports.User = mongoose.model("user", userSchema);
module.exports.Products = mongoose.model("product", productSchema);
module.exports.Scrape = mongoose.model("scrape", scrapeSchema);
module.exports.Request = mongoose.model("request", requestSchema);
module.exports.Monitor = mongoose.model("monitor", monitorSchema);
