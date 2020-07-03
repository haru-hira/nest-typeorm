export class CreateUserDataDTO {
  name!: string;
  gender!: string;
  photo!: string;
}

export class UpdateUserDataDTO {
  name?: string;
  gender?: string;
  photo?: string;
}
