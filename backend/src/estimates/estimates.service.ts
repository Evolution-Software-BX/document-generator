import { BadRequestException, Injectable } from '@nestjs/common';
import { ExcelEstimateParser } from './parsers/excel-estimate.parser';
import { EstimateUploadFile } from './types/parsed-estimate.type';

@Injectable()
export class EstimatesService {
  constructor(private readonly parser: ExcelEstimateParser) {}

  parse(file?: EstimateUploadFile) {
    if (!file) {
      throw new BadRequestException('Файл не передан');
    }

    if (!file.originalname.toLowerCase().endsWith('.xlsx')) {
      throw new BadRequestException('Поддерживаются только .xlsx файлы');
    }

    return this.parser.parse(file.buffer);
  }
}
