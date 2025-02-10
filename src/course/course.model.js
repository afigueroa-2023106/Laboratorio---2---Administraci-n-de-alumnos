import { Schema, model } from "mongoose";

const courseSchema=Schema(
    {
        name:{
            type:String,
            unique:[true,'Course already exist'],
            toLowerCase:true,
            required:[true,'Name is required'],
            maxLength:[25, `Can't be overcome 25 characteres`]
        },
        hour:{
            type:String,
            required:true,
            maxLength:[10, `Can't be overcome 10 characters`]
        }
    }
)
courseSchema.methods.toJSON = function(){
    const {...course}=this.toObject()
    return course
}

export default model('Course',courseSchema)