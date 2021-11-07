const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');
class CourseController {
    // [GET] /sources/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) =>
                res.render('courses/show', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }

    // [GET] /sources/create
    create(req, res, next) {
        res.render('courses/create');
    }

    // [POST] /sources/store
    store(req, res, next) {
        const formData = req.body;

        req.body.image = `https://img.youtube.com/vi/${req.body.videoID}/sddefault.jpg`;

        const course = new Course(formData);
        course
            .save()
            .then(() => res.redirect(`/`))
            .catch((error) => {});
    }
}

module.exports = new CourseController();
