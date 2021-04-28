const router = require("express").Router(),
userRoutes = require("./userRoutes"),
courseRoutes = require("./courseRoutes"),
subscriberRoutes = require("./subscriberRoutes"),
homeRoutes = require("./homeRoutes"),
errorRoutes = require("./errorRoutes");

router.use("/user", userRoutes);
router.use("/courses", courseRoutes);
router.use("/subscribers", subscriberRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;