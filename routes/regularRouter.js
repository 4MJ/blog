const express = require('express');
const router = express.Router();
const MySql = require("sync-mysql");

// with database Create connection
// const conn = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'jesus4Life',
//   database: 'blog',
//   insecureAuth : true
// });
var conn = new MySql({
  host: 'localhost',
  user: 'root',
  password: 'jesus4Life',

});
var result = conn.query('USE blog;');
//connect to database


//getting home page
router.get('/', (req, res)=>{
  let sql = "SELECT * FROM blogpost;";
    let result = conn.query(sql)
    res.render('index',{result:result});
});

router.get('/posts/new', (req, res) => {
    res.render('create')
});

//To post a new Post
router.post('/posts/store', (req, res) => {
    let data = {author_name: req.body.username, blog_title: req.body.title, blog_desc: req.body.description, content: req.body.content};
    let sql = `INSERT INTO blogpost(author_name,blog_title, blog_desc,content) VALUES ('${data.author_name}', '${data.blog_title}', '${data.blog_desc}', '${data.content}')`;
    conn.query(sql)
    res.redirect('/');
});


// //displaying a single post
router.get('/post/:id', async (req, res) => {
  //TODO Check the id factor.
  
    let sql= "SELECT * FROM blogpost WHERE id="+req.params.id;
    let result = conn.query(sql)
    //res.json(result)
    res.render('post',{result:result[0]});
    });

//route for update data
router.get('/update',(req, res) => {
    res.render('update');
    // let sql = "UPDATE blogpost SET author_name='"+req.body.name+"', blog_title='"+req.body.title+"', blog_desc='"+req.body.description+"', content='"+req.body.content+"' WHERE id="+req.body.id;
    // let query = conn.query(sql, (err, results) => {
    //   if(err) throw err;
    //   res.redirect('/');
    // });
  });
   
  // route for delete data
  router.post('/delete/:id',(req, res) => {
    let sql = "DELETE FROM blogpost WHERE id="+req.params.id+"";
    let result = conn.query(sql);
    res.render('index',{result:result});
    // let query = conn.query(sql, (err, results) => {
    //   if(err) throw err;
    //     res.redirect('/');
    // });
  });


module.exports = router;