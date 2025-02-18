import { Model, Schema, model } from "mongoose";

interface userProps extends Document{
  firstName:string;
  lastName:string;
  email:string;
  contact:string;
  password:string;
  role: "user" | "partner" | "admin";
  isVerified:boolean;
}

const userSchema = new Schema<userProps>({
  firstName:{
    type:String,
    required:true
  },
  lastName:{
    type:String
  },
  email:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    lowercase:true
  },
  password:{
    type:String,
    required:true
  },
  contact:{
    type:String,
    required:true,
    unique:true,
    trim:true,
  },
  role:{
    type:String,
    enum:{
      values:["user","partner","admin"],
      message:'validator failed  with value `{VALUE}`'
    },
    default:"user"
  },
  isVerified:{
    type:Boolean,
    default:false
  }
});

export const User: Model<userProps> = model<userProps>("User", userSchema);