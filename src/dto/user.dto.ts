import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDataDTO {
  @ApiProperty({ type: String })
  name!: string;

  @ApiProperty({ type: String })
  gender!: string;

  @ApiProperty({ type: String })
  photo!: string;

  @ApiProperty({ type: [String] })
  photoUrls?: string[];
}

export class UpdateUserDataDTO {
  @ApiProperty({ type: String })
  name?: string;

  @ApiProperty({ type: String })
  gender?: string;

  @ApiProperty({ type: String })
  photo?: string;

  @ApiProperty({ type: [String] })
  photoUrls?: string[];
}
