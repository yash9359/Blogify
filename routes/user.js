const { Router } = require("express");
const { model } = require("mongoose");
const User = require("../models/user");
const { createHmac } = require("crypto");
const { createTokenForUser } = require("../services/authentication");

const router = Router();

router.get("/signin", (req, res) => {
    return res.render("signin");
});
router.get("/signup", (req, res) => {


    return res.render("signup");
});

router.post("/signup", async (req, res) => {
    const { fullName, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.render("signup", {
            err: "Email is already registered",
        })
    }

    const user = await User.create({
        fullName,
        email,
        password,
    });

    const token = createTokenForUser(user);



    return res.cookie("token", token, {
        httpOnly: true,
    }).redirect("/");


    // return res.redirect("/");
});

router.post("/signin", async (req, res) => {
    // entry = backend se user ki puri obj agyi hai
    const DBentry = await User.findOne({ email: req.body.email });
    if (!DBentry) {
         return res.render("signin", {
            err: "No account found with this email address.",
        });
    }
    const hashedInputPassword = createHmac("sha256", DBentry.salt)
        .update(req.body.password)
        .digest("hex");

    if (hashedInputPassword != DBentry.password) {
        // return res.status(400).send({ err: "Invalid Password" });

        return res.render("signin", {
            err: "Invalid Mail or Password",
        });
    }

    // abb login ke baad token dega
    const token = createTokenForUser(DBentry);

    // cokkie bana ke token bhej doo // isi cookie ko verifuy karne ke liye middleware banumga
    // cookie ka naam token rakhaa
    return res.cookie("token", token, {
        httpOnly: true,
    }).redirect("/");


});

router.get("/logout", (req, res) => {
    /// cookie ka naam token hai
    res.clearCookie("token");
    res.redirect("/");
})




module.exports = router;
