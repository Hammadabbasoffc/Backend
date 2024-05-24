const express = require("express");
require("dotenv").config();
const ownerModel = require("../models/owner.model");
const router = express.Router();



router.get("/", (req, res) => {
  res.send("Hey, it's working");
});

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    try {
      let owners = await ownerModel.find();

      if (owners.length > 0) {
        return res.status(503).send("You don't have permission to create Owner");
      }

      let { fullName, email, password } = req.body;
      let createdOwner = await ownerModel.create({
        fullName,
        email,
        password
      });

      res.status(201).send(createdOwner);
    } catch (error) {
      console.error("Error creating owner:", error);
      res.status(500).send("Internal Server Error");
    }
  });
}

module.exports = router;
