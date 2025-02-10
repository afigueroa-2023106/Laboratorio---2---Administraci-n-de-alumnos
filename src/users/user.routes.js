import { Router } from "express";
import { UserValidator } from "../../middlewares/validator.js";
import { add, deleteU, login, update, viewCourse } from "./user.controller.js";
import { validateJwt } from "../../middlewares/validate.jwt.js";



const api = Router();

api.post('/addUser', UserValidator,add)
api.post('/login',login)
api.get('/list/:id', validateJwt(['TEACHER_ROLE', 'STUDENT_ROLE']), viewCourse)
api.put('/updateU/:id',validateJwt(['STUDENT_ROLE']),update)
api.delete('/deleteU/:id',validateJwt(['STUDENT_ROLE']),deleteU)

export default api;