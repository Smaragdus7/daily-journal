const express = require("express");
const bodyParser = require("body-parser");
const { Router } = require("express");
var _ = require('lodash');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutStartingContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactStartingContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const posts = [];

app.get('/', (req, res) => { 
  res.render("home", {
    homeContent: homeStartingContent,
    postsCollection: posts});
})

app.get('/about', (req, res) => { 
  res.render("about", {aboutContent: aboutStartingContent});
})

app.get('/contact', (req, res) => { 
  res.render("contact", {contactContent: contactStartingContent});
})

app.get('/compose', (req, res) => { 
  res.render("compose");
})

app.post('/compose', (req, res) => { 
  const postContent = {
    title: req.body.postTitle,
    body: req.body.postBody
  };
  posts.push(postContent);
  res.redirect("/");
})

app.get('/posts/:topic', (req, res) => {
  let name = _.lowerCase(req.params.topic);
  let obj = posts.find(o => _.lowerCase(o.title) === name);
  if(obj){
    res.render("post", {
      title: obj.title,
      body: obj.body
    });
  }
  else {
    console.log("Match not found!");
  }
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})
