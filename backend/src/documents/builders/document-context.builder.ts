import { Injectable } from '@nestjs/common';

@Injectable()
export class DocumentContextBuilder {
  build(contract: unknown) {
    return {
      contract,
      generatedAt: new Date().toISOString(),
    };
  }
}
