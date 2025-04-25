import { MerchService } from './merch.service';
import { CreateMerchDto } from './dto/create-merch.dto';
import { UpdateMerchDto } from './dto/update-merch.dto';
export declare class MerchController {
    private readonly merchService;
    constructor(merchService: MerchService);
    create(createMerchDto: CreateMerchDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateMerchDto: UpdateMerchDto): string;
    remove(id: string): string;
}
