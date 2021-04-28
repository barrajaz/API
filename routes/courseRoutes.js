const router = require("express").Router(),
    coursesController = require("..controllers/coursesController");


router.get("/", coursesController.index, coursesController.indexView);
router.get("/new", coursesController.new);
router.post("/create", coursesController.create, coursesController.redirectView);
router.get("/:id", coursesController.show, coursesController.showView);
router.get("/:id/edit", coursesController.edit);
router.get("/:id/update", coursesController.update, coursesController.redirectView);
router.get("/:id/delete", coursesController.delete, coursesController.redirectView);

module.exports = router;