import { ApiProperty } from "@nestjs/swagger";

export class CreateQuestionDataDTO {
  @ApiProperty({ type: String, required: true })
  title!: string;

  @ApiProperty({ type: String, required: true })
  text!: string;

  @ApiProperty({ type: [String], required: true })
  categories?: string[];
}
  
export class UpdateQuestionDataDTO {
  @ApiProperty({ type: String, required: false })
  title?: string;

  @ApiProperty({ type: String, required: false })
  text?: string;

  @ApiProperty({ type: [String], required: false })
  categories?: string[];
}
  