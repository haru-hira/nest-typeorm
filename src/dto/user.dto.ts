import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUserDataDTO {
  @ApiProperty({
    description: 'The name of user.',
    maxLength: 100,
  })
  name!: string;

  @ApiProperty({
    description: 'The gender of profile.',
    maxLength: 100,
  })
  gender!: string;

  @ApiProperty({
    description: 'The photo of profile.',
    maxLength: 100,
  })
  photo!: string;

  @ApiPropertyOptional({
    description: 'The url of photo.',
    maxLength: 100,
  })
  photoUrls?: string[];
}

export class UpdateUserDataDTO {
  @ApiPropertyOptional({
    description: 'The name of user.',
    maxLength: 100,
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'The gender of profile.',
    maxLength: 100,
  })
  gender?: string;

  @ApiPropertyOptional({
    description: 'The photo of profile.',
    maxLength: 100,
  })
  photo?: string;

  @ApiPropertyOptional({
    description: 'The url of photo.',
    maxLength: 100,
  })
  photoUrls?: string[];
}
