import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DocumentContextBuilder } from './builders/document-context.builder';

@Injectable()
export class DocumentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly contextBuilder: DocumentContextBuilder,
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
}
