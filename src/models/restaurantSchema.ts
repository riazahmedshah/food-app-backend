import mongoose, {Model, Schema, model} from "mongoose";

interface resProps extends Document{
  contact: Schema.Types.String;
  name:string;
  image:string;
  cuisines:string[];
  totalOutlets:number;
  avgStarRatings:string;
  address:string;
}

const resSchema = new Schema<resProps>({
  contact: { 
    type: Schema.Types.String, 
    ref: 'Signup', 
    required: true
  },
  name:{
    type:String,
    required:true,
    unique:true
  },
  image:{
    type:String,
    required:true,
  },
  cuisines:{
    type:[String],
    required:true
  },
  totalOutlets:{
    type:Number,
    default:1
  },
  avgStarRatings:{
    type:String,
    default:"3.5"
  },
  address:{
    type:String,
    required:true,
  }
});

export const Restaurant: Model<resProps> = model<resProps>("Restaurant",resSchema);