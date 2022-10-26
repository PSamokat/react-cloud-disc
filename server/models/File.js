import {Schema, model} from "mongoose";

const FileSchema = new Schema({
    name: {type: Schema.Types.String, required: true},
    type: {type: Schema.Types.String, required: true},
    accessLink: {type: Schema.Types.String},
    size: {type: Schema.Types.Number, default: 0},
    path: {type: Schema.Types.String, default: ''},
    date: {type: Schema.Types.Date, default: Date.now()},
    user: {type: Schema.Types.ObjectId, ref:'User'},
    parent: {type: Schema.Types.ObjectId, ref:'File'},
    childs: [{type: Schema.Types.ObjectId, ref:'File'}]
})

export default model("File", FileSchema)