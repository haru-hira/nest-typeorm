import { ApiProperty } from "@nestjs/swagger";

export class CreateQuestionDataDTO {
  @ApiProperty({ type: String })
  title!: string;

  @ApiProperty({ type: String })
  text!: string;

  @ApiProperty({ type: [String] })
  categories?: string[];
}
  
export class UpdateQuestionDataDTO {
  @ApiProperty({ type: String })
  title?: string;

  @ApiProperty({ type: String })
  text?: string;

  @ApiProperty({ type: [String] })
  categories?: string[];
}
  