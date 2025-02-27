import { string } from "joi";
import { model, Schema } from "mongoose";
import config from "../../config";
import { TUser } from "./user-interface";
import bcrypt from 'bcrypt';
const userScema = new Schema<TUser>({
    id: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    needsPasswordChange: {
        type: Boolean,
        default : true
    },
    role: {
        type : String,
        enum: ['student', 'admin', 'faculty'],
        required : true
    },
    status: {
        type: String,
        enum: ['in-progress', 'blocked'],
        default : 'in-progress'
    },
    isDeleted: {
        type: Boolean,
        default : false
    },


}, {
    timestamps : true
})

userScema.pre('save', async function (next) {
  console.log(this, 'pre hook : for saving data');
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});
// post save middleware/hook -- save empty string after saving the password
userScema.post('save', function (doc, next) {
  doc.password = '';
  next();
});
export const User = model<TUser>('User', userScema);