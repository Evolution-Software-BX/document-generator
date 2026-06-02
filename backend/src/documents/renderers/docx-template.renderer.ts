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
      nullGetter: part => `{{${part.value}}}`,
    });

    doc.render(context);

    const content = doc.getZip().generate({
      type: 'nodebuffer',
      compression: 'DEFLATE',
    }) as Buffer;

    this.assertNoUnresolvedPlaceholders(content);

    return content;
  }

  private assertNoUnresolvedPlaceholders(content: Buffer) {
    const zip = new PizZip(content);
    const unresolved = new Set<string>();

    for (const fileName of Object.keys(zip.files)) {
      if (!fileName.startsWith('word/') || !fileName.endsWith('.xml')) {
        continue;
      }

      const file = zip.file(fileName);
      const text = file?.asText() ?? '';
      const matches = text.match(/\{\{[^}]+}}/g) ?? [];

      for (const match of matches) {
        unresolved.add(match);
      }
    }

    if (unresolved.size > 0) {
      throw new Error(`Unresolved document placeholders: ${Array.from(unresolved).join(', ')}`);
    }
  }
}
