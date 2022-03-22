import { Controller,
		Request,
		UseGuards,
		Get,
		Res,
		HttpStatus,
		Param,
		NotFoundException,
		Post,
		Body,
		Query,
		Put,
		Delete } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { ValidateObjectId, ValidateObjectSlug } from '../shared/pipes/validate-object-id.pipes';
import { Response } from 'express';

import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('blog')
export class BlogController {

    constructor(
		private authService: AuthService,
		private blogService: BlogService,
	) { }

    @Get('posts')
    async getPosts(@Res() res) {
        const posts = await this.blogService.getPosts();
        return res.status(HttpStatus.OK).json(posts);
    }

	@UseGuards(JwtAuthGuard)
	@Get('admin/posts')
    async getAdminPosts(@Res() res) {
        const posts = await this.blogService.getAdminPosts();
        return res.status(HttpStatus.OK).json(posts);
    }

	@UseGuards(JwtAuthGuard)
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

	@UseGuards(JwtAuthGuard)
    @Post('/post')
    async addPost(@Res() res, @Body() createPostDTO: CreatePostDTO) {
        const newPost = await this.blogService.addPost(createPostDTO);
        return res.status(HttpStatus.OK).json({
            message: "Post has been submitted successfully!",
            post: newPost
        })
    }

	@UseGuards(JwtAuthGuard)
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

	@UseGuards(JwtAuthGuard)
    @Delete('/delete')
    async deletePost(@Res() res, @Query('postID', new ValidateObjectId()) postID) {
        const deletedPost = await this.blogService.deletePost(postID);
        if (!deletedPost) throw new NotFoundException('Post does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Post has been deleted!',
            post: deletedPost
        })
    }

	// This command is NOT actually invalidating the token
	// on server side
	@Post('/logout')
	async logout(
		@Res({passthrough: true}) response: Response) {
		response.clearCookie('jwt')
		return {
			message: 'success'
		}
	}

	@UseGuards(LocalAuthGuard)
	@Post('/login')
	async login(@Request() req) {
		return this.authService.login(req.user);
	}

	@UseGuards(JwtAuthGuard)
	@Get('/profile')
	getProfile(@Request() req) {
		return req.user;
	}
}
