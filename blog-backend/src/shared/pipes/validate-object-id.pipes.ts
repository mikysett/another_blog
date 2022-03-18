import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import * as mongoose from 'mongoose';

@Injectable()
export class ValidateObjectId implements PipeTransform<string> {
   async transform(value: string, metadata: ArgumentMetadata) {
       const isValid = mongoose.Types.ObjectId.isValid(value);
       if (!isValid) throw new BadRequestException('Invalid ID!');
       return value;
   }
}

export class ValidateObjectSlug implements PipeTransform<string> {
	async transform(value: string, metadata: ArgumentMetadata) {
		// TODO implement proper check, right now this can't fail, this is bad
		return value;
	}
 }
 