import mongoose from "mongoose";

// creating schema for the mongoDB database and schema for the storage
// of user data

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      //required true karne se jaroori ho jayega
      required: true,
      //name unique hona chahiye
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
  },
  // time of creation of the user and other is the time of update
  // of the user
  { timestamps: true }
);
// mongoose model
const User = mongoose.model("User", userSchema);

export default User;
