import { InputType } from '@nestjs/graphql';
import { CreateGalleryInput } from './create-gallery.input';

@InputType()
export class UpdateGalleryInput extends CreateGalleryInput {}
