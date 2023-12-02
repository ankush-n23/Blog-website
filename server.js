const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost/blogDB', { useNewUrlParser: true, useUnifiedTopology: true });

const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Post = mongoose.model('Post', postSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) {
      console.error(err);
    } else {
      res.sendFile(__dirname + '/views/index.html');
    }
  });
});

app.post('/compose', (req, res) => {
  const newPost = new Post({
    title: req.body.postTitle,
    content: req.body.postContent
  });

  newPost.save((err) => {
    if (err) {
      console.error(err);
    } else {
      res.redirect('/');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
