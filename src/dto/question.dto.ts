import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateQuestionDataDTO {
  @ApiProperty({
    description: 'The title of question.',
    maxLength: 100,
  })
  title!: string;

  @ApiProperty({
    description: 'The text of question.',
    maxLength: 100,
  })
  text!: string;

  @ApiPropertyOptional({
    description: 'The name of category.',
    maxLength: 100,
  })
  categories?: string[];
}
  
export class UpdateQuestionDataDTO {
  @ApiPropertyOptional({
    description: 'The title of question.',
    maxLength: 100,
  })
  title?: string;

  @ApiPropertyOptional({
    description: 'The text of question.',
    maxLength: 100,
  })
  text?: string;

  @ApiPropertyOptional({
    description: 'The name of category.',
    maxLength: 100,
  })
  categories?: string[];
}
  