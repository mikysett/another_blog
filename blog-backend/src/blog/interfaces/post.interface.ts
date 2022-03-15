import { Document } from 'mongoose';

export interface Comment extends Document {
	readonly body: string;
	readonly author: string;
	readonly date: Date;
	readonly hidden: boolean;
	readonly comments: Comment[];
}

export interface Post extends Document {
    readonly title: string;
    readonly slug: string;
    readonly description: string;
    readonly body: string;
    readonly author: string;
	readonly tags: string[];
    readonly date_posted: string;
	readonly comments: Comment[];
}
