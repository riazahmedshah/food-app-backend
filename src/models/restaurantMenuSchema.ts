import { Model ,Schema, model } from "mongoose";

interface resMenuProps extends Document{
  restaurantId: Schema.Types.ObjectId;
  name:string;
  price:number;
  avgStarRating:string;
  image:string;
  description:string;
  cuisines:string[];
  category:"recomended" | "Break fast" | "Dinner";
}

const resMenuSchema = new Schema<resMenuProps>({
  restaurantId:{
    type:Schema.Types.ObjectId,
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
      values:["Recomended", "Break fast", "Dinner"],
      message:'validator failed  with value `{VALUE}`'
    },
    default:"recomended"
  }
});

export const ResMenu: Model<resMenuProps> = model<resMenuProps>("ResMenu", resMenuSchema);