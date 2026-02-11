import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import morgan from 'morgan';
import mongoose from 'mongoose';
import router from './Routes/blogRoutes.js';
import blogController from './controllers/controllers.js'


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//create app
const app = express();

//connect to mongo db
const dbURI = 'mongodb+srv://danial-nodeblog:danialnodeblog123@nodeblog.ibi0yxh.mongodb.net/?appName=NodeBlog';
console.log('Connecting to MongoDB...');
mongoose.connect(dbURI)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(7000, () => {
            console.log('Server running on port 7000');
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err.message);
    });

//register view engine
app.set('view engine', 'ejs');
// app.set('views','myviews')


//listen for requests
// app.listen(7000);

// app.use((req, res, next) => {
//     console.log('new request made:');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     next();
// })

// app.use((req, res, next) => {
//     console.log('in the next middleware:');

//     next();
// })

// midleware and static files

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'));

//mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog 2',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });
    blog.save()
        .then((results) => {
            res.send(results)
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => { console.log(err) })

})

app.get('/single-blog', (req, res) => {
    Blog.findById('698a1eb34e2a2226225d5c11').then((result) => {
        res.send(result)
    }).catch((err) => { console.log(err) })

})


app.get('/', (req, res) => {
    // res.sendFile(
    //     // '<p>this is a paragraph tag from express file.</p>'
    //     './views/index.html', { root: __dirname }
    // )
    // const blogs = [
    //     { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    //     { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    //     { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    // ];
    // res.render("index", { title: "Home", blogs })
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', { title: "About" })
})


//redirects
app.get('/about-me', (req, res) => {
    res.redirect('/about')
})

//blog routes
app.use(router)
//404 page
//if execution reaches this line this code will execute no matter what hence it should be at the bottom
app.use((req, res) => {
    res.status(404).render('404', { title: "Error 404" })
})
