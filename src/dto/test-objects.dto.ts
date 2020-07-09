import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreateTestDataDTO {
  @ApiPropertyOptional({
    description: 'The attr1 of test-object.',
    maxLength: 100,
  })
  attr1: string;
}

export class UpdateTestDataDTO {
  @ApiPropertyOptional({
    description: 'The attr1 of test-object.',
    maxLength: 100,
  })
  attr1: string;
}
