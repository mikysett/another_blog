import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from './schemas/blog.schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	imports: [
		AuthModule,
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
