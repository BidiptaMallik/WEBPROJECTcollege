const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");


module.exports.registerUser = async function (req, res) {
    try {
        let { email, fullname, password } = req.body;

        if (!email || !fullname || !password)
            return res.redirect("/?error=fields");

        if (!email.endsWith("@gmail.com")) {
            return res.send("Enter valid email");
        }

        let userExists = await userModel.findOne({ email });
        if (userExists)
            return res.redirect("/?error=exists");

        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);

        let newUser = await userModel.create({
            email,
            fullname,
            password: hashedPassword,
        });

        let token = generateToken(newUser);

        res.cookie("token", token);

        return res.redirect("/main");

    } catch (err) {
        console.log("Signup Error:", err.message);
        return res.redirect("/?error=server");
    }
};

module.exports.loginUser = async function (req, res) {
    try {
        let { email, password } = req.body;

        if (!email || !password)
            return res.redirect("/?error=fields");

        if (!email.endsWith("@gmail.com")) {
            return res.send("Enter valid email");
        }

        let user = await userModel.findOne({ email });
        if (!user)
            return res.redirect("/?error=invalid");

        let match = await bcrypt.compare(password, user.password);
        if (!match)
            return res.redirect("/?error=invalid");

        let token = generateToken(user);
        res.cookie("token", token);

        return res.redirect("/main");

    } catch (err) {
        console.log("Login Error:", err.message);
        return res.redirect("/?error=server");
    }
};


module.exports.logout = function (req, res) {
    res.clearCookie("token");
    return res.redirect("/");
};
