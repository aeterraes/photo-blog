import { Product } from '../../product/entities/product.entity';
import { Post } from '../../post/entities/post.entity';
import { Merch } from '../../merch/entities/merch.entity';
export declare class Image {
    id: number;
    url: string;
    alt_text: string;
    merchPackages: Merch[];
    products: Product[];
    posts: Post[];
}
