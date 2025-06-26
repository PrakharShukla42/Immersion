const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');
const Vehicle = require('./models/Vehicles');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/Vehicle_Auth_App')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secretkey', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username });
    if (!user) return done(null, false);
    const isMatch = await user.comparePassword(password);
    return isMatch ? done(null, user) : done(null, false);
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
}

app.get('/', isLoggedIn, async (req, res) => {
    const vehicles = await Vehicle.find({ user: req.user._id });
    res.render('index', { vehicles, user: req.user });
});

app.get('/vehicles/new', isLoggedIn, (req, res) => {
    res.render('new');
});

app.post('/vehicles', isLoggedIn, async (req, res) => {
    const { vehicleName, price, image, desc, brand } = req.body;
    await Vehicle.create({
        vehicleName,
        price,
        image,
        desc,
        brand,
        user: req.user._id
    });
    res.redirect('/');
});

app.get('/vehicles/:id/edit', isLoggedIn, async (req, res) => {
    const vehicle = await Vehicle.findOne({ _id: req.params.id, user: req.user._id });
    if (!vehicle) return res.redirect('/');
    res.render('edit', { vehicle });
});

app.post('/vehicles/:id', isLoggedIn, async (req, res) => {
    const { vehicleName, price, image, desc, brand } = req.body;
    await Vehicle.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        { vehicleName, price, image, desc, brand }
    );
    res.redirect('/');
});

app.post('/vehicles/:id/delete', isLoggedIn, async (req, res) => {
    await Vehicle.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    res.redirect('/');
});

app.get('/register', (req, res) => res.render('register'));
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    await User.create({ username, password });
    res.redirect('/login');
});

app.get('/login', (req, res) => res.render('login'));
app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

app.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/login');
    });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));