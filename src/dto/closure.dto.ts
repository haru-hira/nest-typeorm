import { ApiProperty } from '@nestjs/swagger';

export class CreateClosureDataDTO {
  @ApiProperty({
    description: 'The title of closure.',
    maxLength: 100,
  })
  name!: string;
}
