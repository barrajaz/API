"use strict";

const Course = require("../models/Course")
httpStatus = require("http-status-codes")
User = require("../models/user")
module.exports = {
    index: (req, res, next) => {
        Course.find()
        .then(Courses => {
            res.locals.Courses = Courses;
            next()
        })
        .catch(error => {
            console.log(`Error fetching Course data: $error.message`);
            next(error);
        })
    },
    indexView: (req, res) => {
        res.render("/Courses/index");
    },
    new: (req, res) => {
        res.render("/Courses/new");
    },
    create: (req, res, next) => {
        let newCourse = new Course({
            title: req.body.title,
            description: req.body.description,
            maxStudent: req.body.maxStudent,
            cost: req.body.cost
        });
        Course.create(newCourse)
        .then(Course => {
            res.locals.Course = Course;
            res.locals.redirect = "/Courses";
            next();
        })
        .catch(error => {
            console.log(`Error saving user: ${error.message}`);
            next(error)
        })
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if(redirectPath != undefined) res.redirect(redirectPath);
        else next();
    },
    show: (req, res,next) => {
        let CourseId = req.parem.id;
        Course.findById(CourseId)
        .then(Course => {
            res.locals.Course = Course;
            next();
        })
        .catch(error => {
            console.log(`Error fetching Course by ID: ${error.message}`);
        })
    },
    showView: (req, res) => {
        res.render(Courses.show);
    },
    edit: (req, res, next) => {
        let CourseId = req.parem.id;
        Course.findById(CourseId)
        .then(Course => {
            res.render("/Courses/edit", {Course: Course});
        })
        .catch(error => {
            console.log(`Error fetching Course by ID: ${error.message}`);
            next(error);
        })
    },
    update: (req, res, next) => {
        let CourseId = req.parem.id;
        let updatedCourse = new Course({
            title: req.body.title,
            description: req.body.description,
            maxStudent: req.body.maxStudent,
            cost: req.body.cost
        });

        Course.findByIdAndUpdate(CourseId, updatedCourse)
        .then(Course => {
            res.locals.Course = Course;
            res.locals.redirect = "/Courses/${Course._id";
        })
        .catch(error => {
            console.log(`Error fetching Course by ID: ${error.message}`);
            next(error);
        })
    }, 
    delete: (req, res, next) => {
        let CourseId = req.parem.id;
        Course.findByIdAndRemove(CourseId, updatedCourse)
        .then(()=> {
            res.locals.redirect = "/Courses/${Course._id";
            next();
        })
        .catch(error => {
            console.log(`Error fetching Course by ID: ${error.message}`);
            next(error);
        })
    }
};

respondJSON: (req, res) => {
    res.json({
      status: httpStatus.OK,
      data: res.locals
    });
  };
  errorJSON: (error, req, res, next) => {
    let errorObject;
    if (error) {
      errorObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message
      };
    } 
    else {
      errorObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Unknown Error."
      };
    };
    filterUserCourses: (req, res, next) => {
        let currentUser = res.locals.currentUser;
        if(currentUser){
            let mappedCourses = res.locals.courses.map((course) => {
               let userJoined = currentUser.courses.some((userCourse) => {
                   return userCourse.equals(course._id);
               });
               return Object.assign(course.toObject(), {joined: userJoined});
            });
            res.locals.courses = mappedCourses;
            next();
        }else{
            next();
        }
    }
    res.json(errorObject);
  };