import { Injectable } from '@nestjs/common';

@Injectable()
export class DocxTemplateRenderer {
  render(context: unknown) {
    return Buffer.from(JSON.stringify(context));
  }
}
