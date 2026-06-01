import { Injectable } from '@nestjs/common';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { FileStorage } from './file-storage.interface';

@Injectable()
export class LocalFileStorageService implements FileStorage {
  private readonly root = process.env.STORAGE_ROOT ?? './storage';

  async save(name: string, content: Buffer) {
    await mkdir(this.root, { recursive: true });
    const target = join(this.root, name);
    await writeFile(target, content);
    return target;
  }

  resolve(name: string) {
    return join(this.root, name);
  }
}
