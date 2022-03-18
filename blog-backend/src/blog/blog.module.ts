import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from './schemas/blog.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'Post', schema: BlogSchema }]),
		JwtModule.register({
			secret: 'secret',
			signOptions: {expiresIn: '1d'}
		})
	],
	providers: [BlogService],
	controllers: [BlogController]
})
export class BlogModule {}
