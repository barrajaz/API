const mongoose = require("mongoose"),
{   Schema  } = require("mongoose"),
courseSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            uniqure: true
        },
        description: {
            type: String,
            required: true
        },
        maxStudents: {
            type: String,
            default: 0,
            min = [0, "Course cannot have a negative num. of students"]
        },
        cost: {
            type: Number,
            default: 0,
            min: [0, "Costs could not be negative values"]
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Course", courseSchema);