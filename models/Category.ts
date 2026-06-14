import { model, models, Schema } from "mongoose";

const CategorySchema = new Schema(
    {
        name:{
            fa:{type:String,required:true},
            ar:{type:String,required:true},
            en:{type:String,required:true}
        },
        order:{type:Number,difault:0}
    },
    {timestamps:true}
)

export default models.category || model("category",CategorySchema)