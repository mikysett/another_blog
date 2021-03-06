import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './interfaces/post.interface';
import { CreatePostDTO } from './dto/create-post.dto';

@Injectable()
export class BlogService {

    constructor(@InjectModel('Post') private readonly postModel: Model<Post>) { }

    async getPosts(): Promise<Post[]> {
        const posts = await this.postModel.find({hidden: false}).sort({date_posted: -1}).exec();
        return posts;
    }

	async getAdminPosts(): Promise<Post[]> {
        const posts = await this.postModel.find().sort({date_posted: -1}).exec();
        return posts;
    }

    async getPost(postID): Promise<Post> {
        const post = await this.postModel
            .findById(postID)
            .exec();
        return post;
    }

	async getPostBySlug(postSlug): Promise<Post> {
        const post = await this.postModel
            .findOne({slug: postSlug, hidden: false})
            .exec();
        return post;
    }

    async addPost(createPostDTO: CreatePostDTO): Promise<Post> {
        const newPost = await new this.postModel(createPostDTO);
        return newPost.save();
    }

    async editPost(postID, createPostDTO: CreatePostDTO): Promise<Post> {
        const editedPost = await this.postModel
            .findByIdAndUpdate(postID, createPostDTO, { new: true });
        return editedPost;
    }

    async deletePost(postID): Promise<any> {
        const deletedPost = await this.postModel
            .findByIdAndRemove(postID);
        return deletedPost;
    }

	loginUser(credentials): boolean {
		if (credentials.username == 'admin'
			&& credentials.password == 'admin')
			return (true)
		else
			return (false)
    }
}
