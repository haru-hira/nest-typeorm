export class CreateUserDataDTO {
  name!: string;
  gender!: string;
  photo!: string;
  photoUrls?: string[];
}

export class UpdateUserDataDTO {
  name?: string;
  gender?: string;
  photo?: string;
  photoUrls?: string[];
}
