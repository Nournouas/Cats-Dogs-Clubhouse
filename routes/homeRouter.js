const express = require("express");
const homeRouter = express.Router();
const { processSecretCode, filteredHomepageGetHandler, addMessageHandler, homepageGetHandler, homepageDeleteMessage, secretPageGetHandler } = require("../controllers/homeController")
const pool = require ("../database/pool");

homeRouter.get("/", homepageGetHandler);

homeRouter.get("/delete/:message_id{/:animal}", homepageDeleteMessage);

homeRouter.get("/secret", secretPageGetHandler);

homeRouter.post("/secret", processSecretCode);

homeRouter.post("/new", addMessageHandler)

homeRouter.get("/:filter", filteredHomepageGetHandler);

module.exports = {
  homeRouter,
}