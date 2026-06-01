import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { existsSync } from 'fs';
import { join } from 'path';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TemplatesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) { }

  async findAll() {
    const templates = await this.prisma.template.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        id: 'asc',
      },
    });

    const templatesPath =
      this.configService.get<string>('storage.templatesPath') ||
      './storage/templates';

    return templates.map(template => {
      const fullPath = join(templatesPath, template.filePath);
      const fileExists = existsSync(fullPath);

      return {
        id: template.id,
        code: template.code,
        name: template.name,
        type: template.type,
        legalType: template.legalType,
        paymentType: template.paymentType,
        hasTz: template.hasTz,
        filePath: template.filePath,
        fileExists,
      };
    });
  }

  async findOne(id: number) {
    const template = await this.prisma.template.findUnique({
      where: {
        id,
      },
    });

    if (!template) {
      throw new NotFoundException('Шаблон не найден');
    }

    const templatesPath =
      this.configService.get<string>('storage.templatesPath') ||
      './storage/templates';

    const fullPath = join(templatesPath, template.filePath);

    return {
      id: template.id,
      code: template.code,
      name: template.name,
      type: template.type,
      legalType: template.legalType,
      paymentType: template.paymentType,
      hasTz: template.hasTz,
      filePath: template.filePath,
      fileExists: existsSync(fullPath),
    };
  }
}