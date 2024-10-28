const router = require("express").Router();
const { registerUser, loginUser, currentUser } = require("../controllers/UserController");
const { validateJWTToken } = require("../middleware/authorizationMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get('/getUserDetails', validateJWTToken, currentUser)


module.exports = router;