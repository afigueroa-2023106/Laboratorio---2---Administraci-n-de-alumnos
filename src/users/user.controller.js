import User from './user.model.js'
import Course from '../course/course.model.js'
import { checkPassword, encrypt } from '../../utils/encryp.js'
import { generateJwt } from '../../utils/jwt.js'

export const add = async (req, res) => {
    try {
        const { course, ...data } = req.body;

        if (!Array.isArray(course)) {
            return res.status(400).send({
                success: false,
                message: "The 'course' must be an array"
            })
        }

        const courses = await Course.find({ '_id': { $in: course } })

        if (courses.length !== course.length) {
            return res.status(400).send({
                success: false,
                message: "Some courses are invalid or do not exist"
            })
        }

        const user = new User(data);

        user.course = courses;

        if (user.course.length > 3) {
            return res.status(400).send({
                success: false,
                message: "You cannot be assigned more than 3 courses"
            })
        }

        if (new Set(course).size !== course.length) {
            return res.status(400).send({
                success: false,
                message: "You already have this course"
            })
        }

        user.password = await encrypt(user.password);

        await user.save();

        return res.send({
            message: `Registered successfully, can be logged with username, ${user.username}`
        })

    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'General error with user registration' });
    }
}

export const login = async (req, res) => {
    try {
        const { userLogin, password } = req.body;
        const user = await User.findOne({
            $or: [
                { email: userLogin },
                { username: userLogin }
            ]
        })
        console.log(user);
        if (user && await checkPassword(user.password, password)) {
            const loggedUser = {
                id: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }
            const token = await generateJwt(loggedUser);
            return res.send({
                message: `Welcome ${user.name}`,
                loggedUser,
                token
            })
        }
        return res.status(400).send({ message: 'Invalid Credentials' });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'General error with login function', e });
    }
}

export const viewCourse = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id).populate('course')
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'User and course found',
            courses: user.course,
        })
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Internal server error', e })
    }
}

export const update = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        const updatedUser = await User.findByIdAndUpdate(id, data, { new: true })
        if (!updatedUser) return res.status(400).send({ message: 'User not found' })
        return res.send({ message: 'User updated successfully', updatedUser })
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Internal Server Error', e })
    }
}

export const deleteU = async (req, res) => {
    try {
        const { id } = req.params
        const updatedUser = await User.findByIdAndDelete(id);
        if (!updatedUser) return res.status(400).send({ message: 'User not found' })
        return res.send({ message: 'User deleted successfully', updatedUser })
    } catch (e) {
        console.error(e)
        return res.status(500).send({ message: 'Internal Server Error', e })
    }
}
