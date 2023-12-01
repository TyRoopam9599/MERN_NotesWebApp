import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a name"],
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("UserModel", userSchema);
export default UserModel;
