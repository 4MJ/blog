const express = require('express');
const router = express.Router();
const mysql = require("mysql");

// with database Create connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'jesus4Life',
  database: 'blog',
  insecureAuth : true
});
 
//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});

//getting home page
router.get('/', (req, res)=>{
   res.render('index');
});

router.get('/posts/new', (req, res) => {
    res.render('create')
});

//To post a new Post
router.post('/posts/store', (req, res) => {
    let data = {author_name: req.body.username, blog_title: req.body.title, blog_desc: req.body.description, content: req.body.content};
    let sql = "INSERT INTO blogpost SET ?";
    let query = conn.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});

//to get post
router.get('/', async (req, res) => {
    let sql = "SELECT * FROM blogpost";
    let query = conn.query(sql,(err, results)=>{
        if (err) {
            throw err;
        }
        res.render('index', {
            results: results
        });
    });
});

// //displaying a single post
router.get('/post/:id', async (req, res) => {
  //TODO Check the id factor.
    let sql= "SELECT blogpost.author_name, blogpost.blog_title, blogpost.blog_desc, blogpost.content FROM blogpost"; 
    //"WHERE id="+id.params.id;
    let query = conn.query(sql, (err, results)=>{
        if (err){
            throw err;
        }
        res.render('post',{
           results: results
        });
    });
});

//route for update data
router.post('/update',(req, res) => {
    let sql = "UPDATE blogpost SET author_name='"+req.body.name+"', blog_title='"+req.body.title+"', blog_desc='"+req.body.description+"', content='"+req.body.content+"' WHERE id="+req.body.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
  });
   
  //route for delete data
  router.post('/delete',(req, res) => {
    let sql = "DELETE FROM blogpost WHERE id="+req.body.id+"";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
        res.redirect('/');
    });
  });


module.exports = router;