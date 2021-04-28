"use strict";

const express = require("express"), 
router = require("./routes/index"),
app = express(),
homeController = require("./controllers/homeController"),
errorController = require("./controllers/errorController"),
subscribersController = require("./controllers/subscribersController"),
usersController = require("./controllers/usersController"),
coursesController = require("./controllers/coursesController"),
methodOverride = require("method-override"),
passport = require("passport"),
cookieParser = require("cookie-parser"),
expressSession = require("express-session"),
expressValidator = require("express-validator"),
connectFlash = require("connect-flash"),
layouts = require("express-ejs-layouts"), 
User = require("./models/user"),
mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/confetti_cuisine",
    {useNewUrlParser: true}
    );

mongoose.set("useCreateIndex", true);


app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

router.use(
    methodOverride("_method", {
        methods: ["POST"]
    })
);
router.use(express.json());

router.use(cookieParser("secretCuisine123"));
router.use(expressSession({
    secret: "my_passcode",
    cookie: {
        maxAge: 360000
    },
    resave: false,
    saveUninitialized: false
}));

router.use(connectFlash());

router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.deserializeUser);
passport.deserializeUser(User.serializeUser);

router.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    res.locals.loggedIn = req.isUnauthenticated();
    res.locals.currentUser = req.user;
})

router.use(layouts);
router.use(express.static("public"));
router.use(expressValidator());

router.use(methodOverride("_method", {methods : ["POST", "GET"]}));




app.use("/", router);

app.listen(app.get("port"), () => {
    console.log(`Server is running on port: http://localhost:${app.get("port")}`)
});