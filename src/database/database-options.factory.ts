import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DataSourceOptions, getMetadataArgsStorage } from 'typeorm';

@Injectable()
export class DatabaseOptionsFactory implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      ...this.createDataSourceOptions(),
      autoLoadEntities: true,
      entities: getMetadataArgsStorage().tables.map((table) => table.target),
    };
  }
  createDataSourceOptions(): DataSourceOptions {
    return {
      type: 'mysql',
      host: this.configService.get('DB_HOST'),
      port: this.configService.get('DB_PORT'),
      username: this.configService.get('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get('DB_DATABASE'),
      timezone: '+09:00',
      synchronize: this.configService.get('NODE_ENV') !== 'production',
    };
  }
}
