export class CreateQuestionDataDTO {
    title!: string;
    text!: string;
    categories?: string[];
  }
  
  export class UpdateQuestionDataDTO {
    title?: string;
    text?: string;
    categories?: string[];
  }
  