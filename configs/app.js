'use stict'

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors' 
import courseRoutes from '../src/course/course.routes.js'
import userRoutes from '../src/users/user.routes.js'

const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
}

const routes=(app)=>{
    app.use(courseRoutes)
    app.use(userRoutes)
}

export const initServer = ()=>{
    const app = express() 
    try{
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    }catch(err){
        console.error('Server init failed', err)
    }
}