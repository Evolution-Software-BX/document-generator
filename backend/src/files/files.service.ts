import { Injectable } from '@nestjs/common';
import { LocalFileStorageService } from './storage/local-file-storage.service';

@Injectable()
export class FilesService {
  constructor(private readonly storage: LocalFileStorageService) {}

  resolveTemplate(name: string) {
    return this.storage.resolve(`templates/${name}`);
  }

  resolveGenerated(name: string) {
    return this.storage.resolve(`generated/${name}`);
  }
}
