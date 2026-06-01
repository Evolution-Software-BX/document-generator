import { Injectable, NotFoundException } from '@nestjs/common';
import { access } from 'node:fs/promises';
import { FilesService } from '../files/files.service';
import { GenerationService } from '../generations/generation.service';
import { PrismaService } from '../prisma/prisma.service';
import { DocumentContextBuilder } from './builders/document-context.builder';
import { DocxTemplateRenderer } from './renderers/docx-template.renderer';

@Injectable()
export class DocumentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly contextBuilder: DocumentContextBuilder,
    private readonly renderer: DocxTemplateRenderer,
    private readonly filesService: FilesService,
    private readonly generationService: GenerationService,
  ) {}

  async preview(contractId: number) {
    const contract = await this.prisma.contract.findUnique({
      where: { id: contractId },
      include: { client: true, template: true },
    });

    if (!contract) {
      throw new NotFoundException('Contract not found');
    }

    return this.contextBuilder.build(contract);
  }

  async generateContract(contractId: number) {
    const contract = await this.prisma.contract.findUnique({
      where: { id: contractId },
      include: { client: true, template: true },
    });

    if (!contract) {
      throw new NotFoundException('Contract not found');
    }

    if (!contract.template) {
      throw new NotFoundException('Template not found');
    }

    const templatePath = this.filesService.resolveTemplate(contract.template.filePath);

    try {
      await access(templatePath);
    } catch {
      throw new NotFoundException('Template file not found');
    }

    const context = this.contextBuilder.build(contract);
    const generation = await this.generationService.createProcessing({
      contractId: contract.id,
      sourceDataJson: context,
    });

    try {
      const content = await this.renderer.render(templatePath, context);
      const fileName = `contract_${contract.number}.docx`;
      const filePath = await this.filesService.saveGenerated(fileName, content);
      const updatedGeneration = await this.generationService.markSuccess(
        generation.id,
        fileName,
        filePath,
      );

      return {
        generationId: updatedGeneration.id,
        status: updatedGeneration.status,
        fileName,
        downloadUrl: `/generations/${updatedGeneration.id}/download`,
      };
    } catch (error) {
      await this.generationService.markFailed(
        generation.id,
        error instanceof Error ? error.message : 'Document generation failed',
      );
      throw error;
    }
  }
}
