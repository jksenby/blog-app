const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const url = "mongodb://localhost:27017/blog_app_db";

const blogSchema = mongoose.Schema({
  id: Number,
  title: String,
  content: String,
  authorName: String,
  authorId: String,
  created: Date,
  changed: Date,
});

const userSchema = mongoose.Schema({
  id: Number,
  firstName: String,
  lastName: String,
  age: Number,
  country: String,
  gender: String,
  email: String,
  username: String,
  password: String,
  pfp: String,
  phoneNumber: String,
  isAdmin: Boolean,
  blogIds: Array,
});

const Blog = new mongoose.model("blog", blogSchema, "blog");
const User = new mongoose.model("users", userSchema, "users");

try {
  mongoose.connect(url);
} catch (e) {
  console.error(e);
}

app.use(express.json());

app.post("/register", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const body = new User({
    ...req.body,
    password: await bcrypt.hash(req.body.password, salt),
  });
  try {
    const checkUsername = await User.find({ username: req.body.username });
    const checkEmail = await User.find({ email: req.body.email });
    if (checkEmail.length === 0 && checkUsername.length === 0) {
      const newUser = await body.save();
      res.status(201).json(newUser);
    } else {
      res.status(201).json({ check: "There is already such user" });
    }
  } catch (e) {
    console.log(e);
  }
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.find({
      email: req.body.email,
    });
    if (
      user.length === 1 &&
      (await bcrypt.compare(req.body.password, user[0].password))
    ) {
      res.status(201).json({ message: "You successfully signed in", user });
    } else {
      res.status(201).json({ message: "The username or password is wrong" });
    }
  } catch (e) {
    res.status(400).json({ message: "Something went wrong" });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
