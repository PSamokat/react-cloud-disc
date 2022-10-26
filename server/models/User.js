import {Schema, model} from "mongoose";

const UserSchema = new Schema({
    email: {type: Schema.Types.String, required: true, unique: true},
    password: {type: Schema.Types.String, required: true},
    diskSpace: {type: Schema.Types.Number, default: 1024**3*5},
    usedSpace: {type: Schema.Types.Number, default: 0},
    avatar: {type: Schema.Types.String},
    files: [{type: Schema.Types.ObjectId, ref:'File'}]
})

export default model("User", UserSchema)