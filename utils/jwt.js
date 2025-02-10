'use stict'

import jwt from 'jsonwebtoken'

//Generar token
export const generateJwt=async(payLoad)=>{
    try{
        return jwt.sign(
            payLoad,
            process.env.SECRET_KEY,
            {
                expiresIn:'3h',
                algorithm:'HS256'
            }
        )
    }catch(e){
        console.error(e)
        return e
    }
}