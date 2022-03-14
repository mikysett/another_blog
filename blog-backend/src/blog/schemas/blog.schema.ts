import * as mongoose from 'mongoose';
import { networkInterfaces } from 'os';

export const BlogSchema = new mongoose.Schema({
    title: String,
	slug: String,
    description: String,
    body: String,
    author: String,
    date_posted: { type: Date, default: Date.now },
	hidden: {type: Boolean, default: true, required: true},
	comments: [{
		body: { type: String, required: true },
		author: { type: String, required: true },
		date: { type: Date, default: Date.now },
		hidden: {type: Boolean, default: true, required: true},
	}]
})
