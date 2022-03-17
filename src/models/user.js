import mongoose from "../database/index.js";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
  },
  createdAt: {
    type: String,
    default: new Date(),
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  // vaccines: {
  //   type: Array,
  //   required: true,
  // },
});

const User = mongoose.model("User", UserSchema);

export default User;
