const express = require("express");
const router = express.Router();

const { APP_NAME } = process.env;

const coursesHandler = require("./handler/courses");

// middleware verify token
const verifyToken = require("../middlewares/veryfyToken");
const can = require("../middlewares/permission");

/* GET users listing. */
router.get("/", coursesHandler.getAll);
router.get("/:id", coursesHandler.get);
router.post("/", verifyToken, can("admin"), coursesHandler.create);
router.put("/:id", verifyToken, can("admin"), coursesHandler.update);
router.delete("/:id", verifyToken, can("admin"), coursesHandler.destroy);

module.exports = router;
