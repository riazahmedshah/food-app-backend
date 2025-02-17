import mongoose, { Model ,Schema, model } from "mongoose";

interface resMenuProps extends Document{
  resId: mongoose.Types.ObjectId;
  name:string;
  price:number;
  avgStarRating:string;
  image:string;
  description:string;
  cuisines:string[];
  category:"Recomended" | "Dinner" | "Break fast";
}

const resMenuSchema = new Schema<resMenuProps>({
  resId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Restaurant",
    required:true
  },
  name:{
    type:String,
    required:true,
    unique:true
  },
  price:{
    type:Number,
    default:100,
  },
  image:{
    type:String,
    required:true,
  },
  cuisines:{
    type:[String],
    required:true
  },
  avgStarRating:{
    type:String,
    default:"3.5"
  },
  category:{
    type:String,
    enum:{
      values:["Recomended", "Dinner","Break fast"],
      message:'validator failed  with value `{VALUE}`'
    },
    default:"Recomended"
  },
  description:{
    type:String,
    default:"Default decription of menu"
  }
});

export const ResMenu: Model<resMenuProps> = model<resMenuProps>("ResMenu", resMenuSchema);