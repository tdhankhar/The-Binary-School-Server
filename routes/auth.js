const express = require("express");
const router = express.Router();
const { googleSignIn, facebookSignIn } = require("../controllers/auth");

router.post("/auth/signin/google", googleSignIn);
router.post("/auth/signin/facebook", facebookSignIn);

module.exports = router;
