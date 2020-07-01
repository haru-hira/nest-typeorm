import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(
    private readonly config: ConfigService,
  ) {}

  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    const env = this.config.get('ENV_SETTINGS', 'local');
    if (!env || env === 'local') {
      return {};
    }
    return {
      type: "postgres",
      host: this.config.get('DATABASE_HOST', 'localhost'),
      port: Number(this.config.get('DATABASE_PORT', 5432)),
      username: this.config.get('DATABASE_USERNAME', 'postgres'),
      password: this.config.get('DATABASE_PASSWORD', 'postgres'),
      database: this.config.get('DATABASE_NAME', 'nest_typeorm'),
      synchronize: false,
      migrationsRun: this.config.get('DATABASE_MIG_RUN', true),
      logging: this.config.get('DATABASE_LOGGING', false),
      entities: [join(__dirname + '/../entity/*{.ts,.js}')],
      migrations: [join(__dirname + '/../migration/*{.ts,.js}')],
      subscribers: [join(__dirname + '/../subscriber/*{.ts,.js}')]
    };
  }
}
