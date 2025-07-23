const mongoose = require("mongoose");
const initialData = require("./init.js");
const List = require("../models/listings.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderland";

main()
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

const addData = async () => {
  try {
    // await List.deleteMany({});
    initialData.data = initialData.data.map((obj) => ({
      ...obj,
      owner: "68791cc7502b657b6dff63ef",
    }));
    await List.insertMany(initialData.data);
  } catch (e) {
    console.log(e);
  }
  console.log("All Added");
};

addData();
