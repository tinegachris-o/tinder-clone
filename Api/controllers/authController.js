import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
dotenv.config({ path: "Api/.env" });

//const signToken = (id) => {
  //return jwt.sign({ id }, process.env.JWT_SECRET, {
   // expiresIn: "30d",
 // });
//};
const signToken=(id)=>{
return jwt.sign({id},process.env.JWT_SECRET,{
expiresIn:"31d"
})
}
export const signup = async (req, res) => {
  try {
    const { name, email, password, gender, genderPreference, age } = req.body;
    if (!name || !email || !password || !gender || !genderPreference || !age) {
      return res.status(400).json({
        success: false,
        message: "All fields are required ",
      });
    }
    if (age < 18) {
      return res.status(400).json({
        success: false,
        message: "You must be atleat 18 years old ",
      });
    }
    if (password.length < 3) {
      return res.status(400).json({
        success: false,
        message: "password must be atleast 3 characters ",
      });
    }

    const existingUser = await User.checkIfExists(name, email);

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Name or email already exists",
      });
    }
    // new user
    const hashedpassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedpassword,
      age,
      gender,
      genderPreference,
    });
    ///console.log( "this is hashedpassword:", hashedpassword, "this is normal password", password);
    const token = signToken(newUser._id);
    res.cookie("jwt", token, {
      maxAge: 30 * 24 * 60 * 60 * 1000, //maxMum Age 30 days in milleseconds
      httponly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    const { password: hash, ...others } = newUser.toObject();
    res.status(201).json({
      success: true,
      message: `${newUser.name} created account sucessfully 🚀`,
      user: others,
    });
  } catch (error) {
    console.log("error in signingUp user", error);
    res.status(500).json({ message: "internal server error" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!user && !validPassword) {
      return res.status({
        message: "invalid email or password",
        success: "false",
      });
    }
    /*if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        message: "invalid email or password",
      });
    }

*/
    const token = signToken(user._id);
    res.cookie("jwt", token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httponly: true,
      sameSite: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({
      message: `welcome back ${user.name} 🚀🚀🚀🚀🚀🚀`,
      success: true,
      token: token, // Send token here
    });
  } catch (error) {
    res.status(500).json({
      message: "error in logging user",
    });
  }
};
//LOGOUT

export const logout = async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ success: true, message: "logged out sucessfully" });
};
