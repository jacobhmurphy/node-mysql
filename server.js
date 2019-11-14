const express = require("express");
const mysql = require("mysql");

const server = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "student123",
  database: "blog"
});

db.connect(function(err) {
  if (err) {
    throw err;
  }
  console.log("MySQL is connected");
});

server.get("/create_table", function(req, res) {
  console.log("hitting the 'create_table' route");
  let sql =
    "CREATE TABLE posts(ID int NOT NULL AUTO_INCREMENT, title varchar(255), body TEXT, PRIMARY KEY (ID) );";
  db.query(sql, function(err, result) {
    if (err) throw err;
    res.send("created table post");
  });
});

// create route that adds a post

server.get("/new_post", function(req, res) {
  let post = { title: "hello world", body: "this is a test" };
  let sql = "INSERT INTO posts SET ?";
  db.query(sql, post, function(err, result) {
    if (err) throw err;
    res.send("CREATED NEW BLOG");
  });
});

// create route that deletes post

server.get("/delete_post/:id", function(req, res) {
  console.log(req.params.id);
  let sql = "DELETE FROM posts WHERE ID=" + req.params.id;
  db.query(sql, function(err, result) {
    if (err) throw err;
    res.send("DELETED POST");
  });
});

server.listen("3000", function() {
  console.log("Listening on port 3000...");
});
