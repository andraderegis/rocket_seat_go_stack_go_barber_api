import IStorageProvider from '@shared/providers/storage/interfaces/IStorageProvider';

class MockDiskStorageProvider implements IStorageProvider {
  private storage: string[] = [];

  public async delete(file: string): Promise<void> {
    // eslint-disable-next-line array-callback-return
    this.storage.map((storage, index) => {
      if (file === storage) {
        this.storage.splice(index, 1);
      }
    });
  }

  public async save(file: string): Promise<string> {
    this.storage.push(file);

    return file;
  }
}

export default MockDiskStorageProvider;
