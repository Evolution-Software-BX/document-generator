import { Module } from '@nestjs/common';
import { ContractsController } from './contracts.controller';
import { ContractsService } from './contracts.service';
import { ContractContextService } from './services/contract-context.service';
import { ContractNumberService } from './services/contract-number.service';
import { ContractValidationService } from './services/contract-validation.service';

@Module({
  controllers: [ContractsController],
  providers: [
    ContractsService,
    ContractContextService,
    ContractNumberService,
    ContractValidationService,
  ],
  exports: [ContractsService, ContractNumberService],
})
export class ContractsModule {}
