import { model, models, Schema } from "mongoose";

const ItemSchema = new Schema({
  name: {
    fa: { type: String, required: true },
    ar: { type: String, required: true },
    en: { type: String, required: true },
  },
  description: {
    fa: { type: String, default: "" },
    ar: { type: String, default: "" },
    en: { type: String, default: "" },
  },
  price:{type:Number, required:true},
  image:{type:String,default:true},
  category:{type:Schema.Types.ObjectId, ref:'Category',required:true},
  available:{type:Boolean ,default:true}

},
{timestamps:true}
);

export default models.Item || model('Item',ItemSchema)
