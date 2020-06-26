import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name:String,
  surname:String,
  email:String,
  password:String,
  eventsGenerated:[{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}],
});

const User = model('User', userSchema);
export default User;
