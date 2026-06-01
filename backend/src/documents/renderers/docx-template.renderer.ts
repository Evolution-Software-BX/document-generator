import { Injectable } from '@nestjs/common';
import { readFile } from 'node:fs/promises';

const Docxtemplater = require('docxtemplater');
const PizZip = require('pizzip');

@Injectable()
export class DocxTemplateRenderer {
  async render(templatePath: string, context: Record<string, unknown>) {
    const template = await readFile(templatePath);
    const zip = new PizZip(template);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: {
        start: '{{',
        end: '}}',
      },
    });

    doc.render(context);

    return doc.getZip().generate({
      type: 'nodebuffer',
      compression: 'DEFLATE',
    }) as Buffer;
  }
}
