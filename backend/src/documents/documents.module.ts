import { Module } from '@nestjs/common';
import { DocumentContextBuilder } from './builders/document-context.builder';
import { EstimateTableBuilder } from './builders/estimate-table.builder';
import { LegalTextBuilder } from './builders/legal-text.builder';
import { PaymentTextBuilder } from './builders/payment-text.builder';
import { TermsTextBuilder } from './builders/terms-text.builder';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { DocxTemplateRenderer } from './renderers/docx-template.renderer';

@Module({
  controllers: [DocumentsController],
  providers: [
    DocumentsService,
    DocumentContextBuilder,
    EstimateTableBuilder,
    LegalTextBuilder,
    PaymentTextBuilder,
    TermsTextBuilder,
    DocxTemplateRenderer,
  ],
  exports: [DocumentsService],
})
export class DocumentsModule {}
