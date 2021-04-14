import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

import { container } from 'tsyringe';
import { Exclude, Expose } from 'class-transformer';

import { CONTAINER_NAME_DEPENDENCIES } from '@shared/constants';

import IFileSourceStorageProvider from '@shared/providers/file-source-storage/interfaces/IFileSourceStorageProvider';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    try {
      const fileSourceStorage: IFileSourceStorageProvider = container.resolve(
        CONTAINER_NAME_DEPENDENCIES.PROVIDER.FILE_SOURCE_STORAGE
      );

      return this.avatar && fileSourceStorage ? fileSourceStorage.url(this.avatar) : null;
    } catch {
      return null;
    }
  }
}

export default User;
