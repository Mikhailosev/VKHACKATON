const express = require("express");
const router = express.Router();
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
let app = express();
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
app.use(express.static(path.join(__dirname, "client/")));

//Connect to mlab DB
const port = process.env.PORT || 5000;
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@marketplace-bnghg.mongodb.net/hackaton?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(port);
  })
  .catch(err => {
    console.log(err);
  });
mongoose.connection.once("open", () => {
  console.log("connected to DB");
});
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);
app.use("/", require("./schema/post"));
