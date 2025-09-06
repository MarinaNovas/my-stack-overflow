import { model, models, Schema } from "mongoose";

export interface IModel {}

const ModelSchema = new Schema({}, { timestamps: true });

const Model = models?.account || model<IModel>("Account", ModelSchema);
export default Model;
