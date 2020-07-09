import { ApiProperty } from "@nestjs/swagger";

export class CreateTestDataDTO {
  @ApiProperty({ type: String, required: false })
  attr1: string;
}

export class UpdateTestDataDTO {
  @ApiProperty({ type: String, required: false })
  attr1: string;
}
