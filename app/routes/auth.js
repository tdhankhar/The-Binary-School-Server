const express = require("express");
const router = express.Router();
const { googleSignIn, facebookSignIn } = require("../controllers/auth");

router.post("/auth/signin/google", googleSignIn);
router.post("/auth/signin/facebook", facebookSignIn);
router.get("/auth/signin/test", (req, res) => {
	console.log("Test hit!");
	res.send("<h1>Congratulations</h1>");
});

module.exports = router;
