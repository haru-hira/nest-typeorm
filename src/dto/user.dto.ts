import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDataDTO {
  @ApiProperty({ type: String, required: true })
  name!: string;

  @ApiProperty({ type: String, required: true })
  gender!: string;

  @ApiProperty({ type: String, required: true })
  photo!: string;

  @ApiProperty({ type: [String], required: false })
  photoUrls?: string[];
}

export class UpdateUserDataDTO {
  @ApiProperty({ type: String, required: false })
  name?: string;

  @ApiProperty({ type: String, required: false })
  gender?: string;

  @ApiProperty({ type: String, required: false })
  photo?: string;

  @ApiProperty({ type: [String], required: false })
  photoUrls?: string[];
}
