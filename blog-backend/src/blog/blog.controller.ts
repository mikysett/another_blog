import { Controller, Get, Res, Req, HttpStatus, Param, NotFoundException, UnauthorizedException, Post, Body, Query, Put, Delete } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { ValidateObjectId, ValidateObjectSlug } from '../shared/pipes/validate-object-id.pipes';
import { userInfo } from 'os';
import { JwtService } from '@nestjs/jwt';
import { PassThrough } from 'stream';
import { Response, Request } from 'express';

@Controller('blog')
export class BlogController {

    constructor(
		private blogService: BlogService,
		private jwtService: JwtService
	) { }

    @Get('posts')
    async getPosts(@Res() res) {
        const posts = await this.blogService.getPosts();
        return res.status(HttpStatus.OK).json(posts);
    }

    @Get('post-id/:postID')
    async getPostByID(
		@Res() res,
		@Param('postID', new ValidateObjectId()) postID) {
        const post = await this.blogService.getPost(postID);
        if (!post) throw new NotFoundException('Post does not exist!');
        return res.status(HttpStatus.OK).json(post);
    }

    @Get('post/:postSlug')
    async getPostBySlug(
		@Res() res,
		@Param('postSlug', new ValidateObjectSlug()) postSlug) {
        const post = await this.blogService.getPostBySlug(postSlug);
        if (!post) throw new NotFoundException('Post does not exist!');
        return res.status(HttpStatus.OK).json(post);
    }

    @Post('/post')
    async addPost(@Res() res, @Body() createPostDTO: CreatePostDTO) {
        const newPost = await this.blogService.addPost(createPostDTO);
        return res.status(HttpStatus.OK).json({
            message: "Post has been submitted successfully!",
            post: newPost
        })
    }

	@Put('/edit')
    async editPost(
        @Res() res,
        @Query('postID', new ValidateObjectId()) postID,
        @Body() createPostDTO: CreatePostDTO
    ) {
        const editedPost = await this.blogService.editPost(postID, createPostDTO);
        if (!editedPost) throw new NotFoundException('Post does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Post has been successfully updated',
            post: editedPost
        })
    }

    @Delete('/delete')
    async deletePost(@Res() res, @Query('postID', new ValidateObjectId()) postID) {
        const deletedPost = await this.blogService.deletePost(postID);
        if (!deletedPost) throw new NotFoundException('Post does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Post has been deleted!',
            post: deletedPost
        })
    }

	@Post('/login')
	async login(
		@Res({passthrough: true}) res,
		@Body() credentials) {
        const isUserValidated = this.blogService.loginUser(credentials);
        if (!isUserValidated) throw new UnauthorizedException("Bad credentials!");

		const jwt = await this.jwtService.signAsync({user: credentials.user})

		res.cookie('jwt', jwt, {httpOnly: true})

        return {
			message: 'success'
		};
    }

	@Get('/user')
	async user(
		@Req() request: Request) {
		try {
			const cookie = request.cookies['jwt']
			const data = await this.jwtService.verifyAsync(cookie)

			if (!data) {
				throw new UnauthorizedException()
			}
			return data
		} catch (e) {
			throw new UnauthorizedException()
		}
	}

	@Post('/logout')
	async logout(
		@Res({passthrough: true}) response: Response) {
		response.clearCookie('jwt')
		
		return {
			message: 'success'
		}
	}
}
