import express from "express"
import Blog from '../models/blog.js';
import blogController from '../controllers/controllers.js'


const router = express.Router();

router.get('/blogs/create', (req, res) => {
    res.render('blogs/create', { title: "Create a new Blog" })
})

router.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('blogs/index', { title: 'All Blogs', blogs: result })
        }).catch((err) => {
            console.log(err)
        })

})

router.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err)
        })
})

 router.get('/blogs/:id',
 
// (req, res) => {
//     const id = req.params.id;
//     Blog.findById(id)
//         .then((result) => {
//             res.render('details', { blog: result, title: 'Blog Details' })
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// }
blogController.blog_details
)

router.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blogs' })
        })
        .catch((err) => {
            console.log(err)
        })
})

export default router