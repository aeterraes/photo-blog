import { CreateMerchDto } from './dto/create-merch.dto';
import { UpdateMerchDto } from './dto/update-merch.dto';
export declare class MerchService {
    create(createMerchDto: CreateMerchDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateMerchDto: UpdateMerchDto): string;
    remove(id: number): string;
}
