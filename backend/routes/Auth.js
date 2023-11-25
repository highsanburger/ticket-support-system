const { Signup, Login } = require("../controllers/AuthController");
const { userVerification } = require("../middleware/AuthMiddleware");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/home", userVerification);

module.exports = router;
