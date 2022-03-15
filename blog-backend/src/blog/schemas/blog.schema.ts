import * as mongoose from 'mongoose';
import { networkInterfaces } from 'os';

export const CommentSchema = new mongoose.Schema({
	body: { type: String, required: true },
	author: { type: String, required: true },
	date: { type: Date, default: Date.now },
	hidden: {type: Boolean, default: true, required: true}
})

// To enable recursive comments structure
CommentSchema.add({ comments: [CommentSchema] })

export const BlogSchema = new mongoose.Schema({
	title: String,
	slug: String,
    description: String,
    body: String,
    author: String,
	tags: [String],
    date_posted: { type: Date, default: Date.now },
	hidden: {type: Boolean, default: true, required: true},
	comments: [CommentSchema]
})
