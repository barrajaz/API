"use strict";

const passport = require("passport");
const { use } = require("passport");
const User = require("../models/User")

module.exports = {
    login: (req, res) => {
        res.render("users/login");
    },
    index: (req, res, next) => {
        User.find()
        .then(Users => {
            res.locals.Users = Users;
            next()
        })
        .catch(error => {
            console.log(`Error fetching User data: $error.message`);
            next(error);
        })
    },
    indexView: (req, res) => {
        res.render("/Users/index");
    },
    new: (req, res) => {
        res.render("/Users/new");
    },
    create: (req, res, next) => {
        if(req.skip) return next(); 
        let userParems = getUserParems(req.body);

        let newUser = new User(userParems);
        User.register(userParems, req.body.password, (error, user) => {
            if(user) {
                req.flash("success", "User account successfully created!");
                req.locals.redirect = "/users";
                next();
            }
            else {
                req.flash("error", `failed to create user account: ${error.message}`)
                res.locals.redirect = "/users/new";
                next();
            }
        });
    },
    validate: (req, res, next) => {
        req.sanitizeBody("email").normalizeEmail({
            all_lowercase: true
        }).trim();

        req.check("email", "email is not valid!").isEmail();
        req.check("zipCode", "Zip Code is not valid!").notEmpty().isInt().isLength({
            min: 5,
            max: 5
        });
        req.check("password", "Password cannot be empty").notEmpty();
        req.getValidationResult().then((error) => {
            if(!error.isEmpty()) {
                let messages = error.array().map (e => e.msg);
                req.flash("error", messages.join( " and "));
                req.skip = true;
                res.local.redirect = "/users/new"
                next();
            }
            else next();
        })
    },
    authenticate: passport.authenticate("local", {
        failureRedirect: "/users/login",
        failureFlash: "Login failed! Check your email or password!",
        successRedirect: "/",
        successFlash: "Logged in!"
    }),
    logout: (req, res, next) => {
        req.logout();
        req.flash("success", "You have been logged out!");
        res.locals.redirect = "/";
        next();
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if(redirectPath != undefined) res.redirect(redirectPath);
        else next();
    },
    show: (req, res,next) => {
        let UserId = req.parem.id;
        User.findById(UserId)
        .then(User => {
            res.locals.User = User;
            next();
        })
        .catch(error => {
            console.log(`Error fetching User by ID: ${error.message}`);
        })
    },
    showView: (req, res) => {
        res.render(Users.show);
    },
    edit: (req, res, next) => {
        let UserId = req.parem.id;
        User.findById(UserId)
        .then(User => {
            res.render("/Users/edit", {User: User});
        })
        .catch(error => {
            console.log(`Error fetching User by ID: ${error.message}`);
            next(error);
        })
    },
    update: (req, res, next) => {
        if(req.skip) return next();
        let UserId = req.parem.id;
        let updatedUser = new User({
            name: {
                first: req.body.first,
                last: req.body.last
            },
            email: req.body.email,
            zipCode = req.body.zipCode
        });

        User.findByIdAndUpdate(UserId, updatedUser)
        .then(User => {
            res.locals.User = User;
            res.locals.redirect = "/Users/${User._id";
        })
        .catch(error => {
            console.log(`Error fetching User by ID: ${error.message}`);
            next(error);
        })
    }, 
    delete: (req, res, next) => {
        let UserId = req.parem.id;
        User.findByIdAndRemove(UserId, updatedUser)
        .then(()=> {
            res.locals.redirect = "/Users/${User._id";
            next();
        })
        .catch(error => {
            console.log(`Error fetching User by ID: ${error.message}`);
            next(error);
        })
    }
}