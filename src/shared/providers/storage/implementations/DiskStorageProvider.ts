import fs from 'fs';
import path from 'path';

import uploadConfig from '@config/upload';

import IStorageProvider from '@shared/providers/storage/interfaces/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async delete(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadFolder, file);

    try {
      await fs.promises.unlink(filePath);
    } catch {
      //
    }
  }

  public async save(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadFolder, file)
    );

    return file;
  }
}

export default DiskStorageProvider;
