import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { User } from '../entity/user';
import { Profile } from 'src/entity/profile';
import { CreateUserDataDTO, UpdateUserDataDTO } from 'src/dto/user.dto';
import { Photo } from 'src/entity/photo';

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
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const profile = new Profile();
      profile.gender = data.gender;
      profile.photo = data.photo;
      await queryRunner.manager.save(profile);
  
      const photos: Photo[] = [];
      if (data.photoUrls) {
        for (const url of data.photoUrls) {
          const photo = new Photo();
          photo.url = url;
          await queryRunner.manager.save(photo);
          photos.push(photo);
        }
      }
  
      const user = new User();
      user.name = data.name;
      user.profile = profile;
      user.photos = photos;
      await queryRunner.manager.save(user);

      await queryRunner.commitTransaction();
      return;
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async update(id: number, data: Partial<UpdateUserDataDTO>): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const user = await queryRunner.manager.findOne(User, id, { relations: ["profile"] });
      if (user) {
        const updatedUser = Object.assign(user, data); // 上書き
        await queryRunner.manager.save(updatedUser);
        if (user.profile) {
          const updatedProfile = Object.assign(user.profile, data);
          await queryRunner.manager.save(updatedProfile);
        }
      }
      await queryRunner.commitTransaction();
      return;
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const user: User = await queryRunner.manager.findOne(User, id, { relations: ["profile", "photos"] });
      if (user) {
        if (user.photos) {
          for (const photo of user.photos) {
            await queryRunner.manager.remove(photo);
          }
        }
        await queryRunner.manager.remove(user);
        const profile: Profile = user.profile;
        if (profile) {
          await queryRunner.manager.remove(profile);
        }
      }
      await queryRunner.commitTransaction();
      return;
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
