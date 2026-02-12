import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import morgan from 'morgan';
import mongoose from 'mongoose';
import router from './Routes/blogRoutes.js';
import dotenv from 'dotenv'
import Blog from './models/blog.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

//create app
const app = express();

//connect to mongo db
console.log('Connecting to MongoDB...');
mongoose.connect(process.env.dbURI)
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
app.get('/add-single-blog', (req, res) => {
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

app.get('/add-many-blogs', (req, res) => {

  const blogs = [
    {
      title: 'The Discipline of Showing Up',
      snippet: 'Why consistency quietly outperforms motivation.',
      body: `Motivation is emotional weather. Some days it storms with intensity. Other days it vanishes without warning. If you build your habits around motivation, you are building on unstable ground.

Discipline is different. It does not care how you feel. It cares about what you said you would do. It is mechanical, sometimes boring, often repetitive. And yet, it is the engine behind every long-term achievement. Athletes train when they are tired. Developers debug when they are frustrated. Writers write when they have nothing clever to say.

The real secret is not intensity but continuity. Doing something small every single day compounds in a way the brain struggles to appreciate. One page a day becomes a book. One hour of coding becomes a deployed product. One workout becomes a transformation.

When you show up consistently, you stop negotiating with yourself. The work becomes part of your identity. And identity is far more powerful than fleeting motivation.`
    },
    {
      title: 'Learning to Think in Systems',
      snippet: 'Why most problems are bigger than they appear.',
      body: `We tend to search for simple causes. If sales drop, blame marketing. If grades fall, blame the exam. If traffic builds, blame a slow driver. But reality is rarely that simple.

Systems thinking is the ability to see how parts interact. In a system, feedback loops amplify or reduce effects. Incentives shape behavior. Small changes in one area ripple outward into unexpected consequences. The world is not a straight line of cause and effect. It is a network.

Consider social media. It is not just an app. It is algorithms optimizing engagement, advertisers optimizing profit, and users optimizing attention. Each participant influences the others. The result is not accidental. It is emergent.

When you learn to think in systems, frustration transforms into analysis. Instead of asking who failed, you ask what structure produced this outcome. That shift alone makes you a sharper thinker and a better problem solver.`
    },
    {
      title: 'The Strange Power of Boredom',
      snippet: 'Why creativity begins when stimulation ends.',
      body: `Boredom has a bad reputation. We treat it like an error state that must be corrected immediately. A free moment appears and we instinctively reach for a screen.

But boredom is not emptiness. It is space. And space is where ideas form. When the brain is not overloaded with input, it begins to connect distant memories, unresolved problems, and half-formed concepts. That wandering state is deeply creative.

Many breakthroughs in science and art emerged during quiet moments. A walk. A shower. A long train ride. These are not glamorous productivity hacks. They are unstructured mental playgrounds.

The next time you feel bored, resist the reflex to eliminate it. Sit with it. Let your mind wander without direction. You may discover that boredom is not the absence of thought, but the birthplace of original thinking.`
    },
    {
      title: 'Failure as Data',
      snippet: 'Reframing mistakes as information.',
      body: `Failure feels personal because we attach identity to outcomes. If the project fails, we feel like we failed. If the exam goes poorly, we label ourselves incapable. This is emotionally powerful but intellectually flawed.

In science, failure is not shameful. It is data. An experiment that disproves a hypothesis is still valuable. It narrows the field of uncertainty. It tells you where not to look next time.

Entrepreneurs iterate. Engineers prototype. Athletes adjust technique after loss. In every high-performing field, mistakes are treated as feedback loops rather than verdicts.

The shift is subtle but transformative. Instead of asking, “Why am I bad at this?” ask, “What is this result teaching me?” That question turns setbacks into stepping stones. Over time, the accumulation of corrected errors builds mastery.`
    },
    {
      title: 'Attention in the Age of Noise',
      snippet: 'Why focus has become a competitive advantage.',
      body: `We live in an era of infinite input. News updates, notifications, short videos, endless feeds. The modern mind is under constant demand. Every platform competes for seconds of your attention.

Attention, however, is finite. You cannot multiply it. You can only allocate it. What you repeatedly focus on shapes your thoughts, your knowledge, and eventually your identity.

Deep work — sustained, uninterrupted concentration — has become rare. And rarity creates value. The ability to focus for an hour without distraction is now a superpower.

Protecting your attention requires deliberate boundaries. Turning off notifications. Setting focused time blocks. Choosing long-form reading over rapid scrolling. These small decisions accumulate into mental clarity.

In a world optimized to fragment your focus, choosing depth over distraction is both practical and quietly rebellious.`
    }
  ];

  Blog.insertMany(blogs)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });

});

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => { console.log(err) })

})

app.get('/delete-all-blogs', (req, res) => {
  Blog.deleteMany({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

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
