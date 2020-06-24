import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
});

const User = model('User', userSchema);
export default User;
