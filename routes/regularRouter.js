const express = require('express');
const router = express.Router();
const Post = require("../models/Post")

//getting home page
router.get('/', (req, res)=>{
    res.render('index');
});

router.get('/posts/new', (req, res) => {
    res.render('create')
});

// //To post a new Post
// app.post('/posts/store', (req, res) => {
//     Post.create(req.body, (error, post) => {
//         res.redirect('/')
//     })
// });

// //to get post
// router.get('/', async (req, res) => {
//     const posts = await Post.find({})
//     res.render('index', {
//         posts
//     })
// });

// //displaying a single post
// router.get('/post/:id', async (req, res) => {
//     const post = await Post.findById(req.params.id)
//     res.render('post', {
//         post
//     })
// });
module.exports = router;