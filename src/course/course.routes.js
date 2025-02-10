import { Router } from "express";
import { Add, list, deleteCourse, updateCourse } from "./course.controller.js"
import { courseValidator } from "../../middlewares/validator.js"
import { validateJwt } from "../../middlewares/validate.jwt.js"

const api = Router();

api.post('/add', courseValidator, Add)
api.get('/list', list)
api.put('/update/:id', validateJwt(['TEACHER_ROLE']), updateCourse)
api.delete('/delete/:id', validateJwt(['TEACHER_ROLE']), deleteCourse)

export default api
