"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMerchDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_merch_dto_1 = require("./create-merch.dto");
class UpdateMerchDto extends (0, mapped_types_1.PartialType)(create_merch_dto_1.CreateMerchDto) {
}
exports.UpdateMerchDto = UpdateMerchDto;
//# sourceMappingURL=update-merch.dto.js.map