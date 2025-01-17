import { Model, Document, Types } from "mongoose";

export interface PrizesInterface extends Document {
	name: string;
	img: string;
	brandImg: string;
	prizeCategory: Types.ObjectId;
}

export interface PrizesSchema extends Model<PrizesInterface> {}
