import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { User } from '../entity/user';
import { Profile } from 'src/entity/profile';
import { CreateUserDataDTO, UpdateUserDataDTO } from 'src/dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  async all(): Promise<User[]> {
    return this.repository.find({ relations: ["profile"] });
  }

  async one(id: number): Promise<User> {
    return this.repository.findOne(id, { relations: ["profile"] });
  }

  async create(data: Partial<CreateUserDataDTO>): Promise<User> {
    const profile = new Profile();
    profile.gender = data.gender;
    profile.photo = data.photo;
    await this.connection.manager.save(profile);
    const user = new User();
    user.name = data.name;
    user.profile = profile;
    await this.connection.manager.save(user);
    return;
  }

  async update(id: number, data: Partial<UpdateUserDataDTO>): Promise<void> {
    const user = await this.repository.findOne(id, { relations: ["profile"] });
    if (user) {
      const updatedUser = Object.assign(user, data); // 上書き
      await this.connection.manager.save(updatedUser);
      if (user.profile) {
        const updatedProfile = Object.assign(user.profile, data);
        await this.connection.manager.save(updatedProfile);
      }
    }
  }

  async remove(id: number): Promise<void> {
    const user: User = await this.repository.findOne(id, { relations: ["profile"] });
    if (user) {
      await this.connection.manager.remove(user);
      const profile: Profile = user.profile;
      if (profile) {
        await this.connection.manager.remove(profile);
      }
    }
  }
}
