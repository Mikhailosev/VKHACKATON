const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const Post = require("../models/post");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/bmp" ||
    file.mimetype === "	image/gif" ||
    file.mimetype === "image/svg+xml" ||
    file.mimetype === "image/tiff"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 4000 * 4000 * 10 },
  fileFilter: fileFilter
});
router.post("/postAdd", upload.single("postImage"), (req, res) => {
  const post = new Post({
    groupId: req.body.groupId,
    authorId: req.body.authorId,
    teaser: req.body.teaser,
    title: req.body.title,
    text: req.body.text,
    image: req.file.path,
    likes: req.body.likes,
    viewed: req.body.viewed,
    buy: req.body.buy,
    content: req.body.content
  });
  post
    .save()
    .then(result => {
      console.log(req.file.size);

      res.send(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
router.post("/updatedPostLikes/:postId/:userId", (req, res, next) => {
  const id = req.params.postId;
  const userId = req.params.userId;

  Post.find(id).then(result => {
    Post.findOneAndUpdate(
      { _id: id },
      {
        likes: res.likes.push(`${userId}`)
      },
      { new: true },
      error => {
        if (error) {
          res.send(error);
        }
      }
    ).then(result => {
      res.send(result);
    });
  });
});
router.post("/updatedPostViews/:postId", (req, res, next) => {
  const id = req.params.postId;
  Post.findOneAndUpdate(
    { _id: id },
    {
      viewed: req.body.viewed + 1
    },
    { new: true },
    error => {
      if (error) {
        res.send(error);
      }
    }
  ).then(result => {
    res.send(result);
  });
});
router.delete("/delete/:postId", (req, res, next) => {
  const id = req.params.postId;
  Post.deleteOne({
    _id: id
  }).then(docs => {
    res.send(docs);
    //if(docs.length>=0){
  });
});
module.exports = router;
