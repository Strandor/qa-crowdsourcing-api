import { Schema, model, Types } from "mongoose";
import { ArticleSources } from "..";
import {
	ArticlesCollectionInterface,
	ArticlesInterface,
} from "./interface";
import * as statics from "./statics";
import * as methods from "./methods";

const articleSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		extract: {
			type: String,
			required: true,
		},
		key: {
			type: String,
			required: true,
		},
		paragraphs: {
			type: [String],
			required: true,
			validate: {
				validator: (v: string[]) => v.length > 0,
			},
		},
		sourceId: {
			type: Types.ObjectId,
			required: true,
		},
	},
	{ timestamps: true }
);

articleSchema.statics = statics;
articleSchema.methods = methods;

articleSchema.pre<ArticlesInterface>("save", async function (next) {
	if (this.isModified("sourceId")) {
		const doc = await ArticleSources.findById(this.sourceId);
		if (!doc) throw new Error("Article source not found");
	}

	next();
});

articleSchema.index({ sourceId: 1, key: 1 }, { unique: true });

export const Articles = model<
	ArticlesInterface,
	ArticlesCollectionInterface
>("articles", articleSchema, "articles");

export * from "./interface";
