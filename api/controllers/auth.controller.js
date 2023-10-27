// importing user

import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  // we et the information from req.body
  const { username, email, password } = req.body;
  // encryption of the password so that it is not shown in the database
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    //saving the user
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    // if already exists it will catch the error
    // the best way is to do it to handle error is to have a function
    // and middleware
    next(error);
  }
};

// next to use middleware
//
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // check the email exists or not
    // key and value have same name so we can delete it in email
    const validUser = await User.findOne({ email });
    // using the middleware next to handle error
    if (!validUser) return next(errorHandler(404, "User not found!"));
    // bcryptjs use karna hoga kyuki encrypted hai passowrd
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    // error handler middleware is in index.js file in api
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    // wen need to authenticate the user the way we do the
    // authentication is to add a cookie inside the browser and we need
    // to create a hash token that includes the email of the user
    // and then we save this token inside browser cookie
    // using jwt package to create the token
    // using the sign method of jwt and we need to add information
    // that is unique to the user it  can be using id is best because
    // anyone would not have access to user email and password as it
    // would be stored in form of ID
    // we also add a secret key hashed and absed on our secret key
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    // we do not have to pass the password
    const { password: pass, ...rest } = validUser._doc;
    res
      // httptrue no other third party application can have access
      // to our cookie makes cookie safer
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // user h ki nhi agar nhi h to naya create karna hoga
    if (user) {
      // token create karna h aur usko cookie mein store karna h\
      // agar user exists karta h to usko authenticate
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      // random password generate karna hoga
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      // hashing using bcrypt.js
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        // jo jo chiz user name mein required h
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        // agar avatar nhi lagayega to jo default hoga wo aa
        // jayega redux mein jo define kiye h
        avatar: req.body.photo,
      });
      // jo naya user create kiye h usko save karna hoga
      await newUser.save();
      // new user kie liye token create karna hoga
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      // spread operator
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};
