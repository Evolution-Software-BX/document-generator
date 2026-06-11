import {
  Body,
  Controller,
  Delete,
  BadRequestException,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EstimateUploadFile } from '../estimates/types/parsed-estimate.type';
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { FullGenerateContractDto } from './dto/full-generate-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post()
  create(@Body() data: CreateContractDto) {
    return this.contractsService.create(data);
  }

  @Post('full-generate')
  @UseInterceptors(FileInterceptor('file'))
  fullGenerate(@Body('payload') payload: string, @UploadedFile() file?: EstimateUploadFile) {
    if (!payload) {
      throw new BadRequestException('Payload is required');
    }

    let parsedPayload: FullGenerateContractDto;

    try {
      parsedPayload = JSON.parse(payload) as FullGenerateContractDto;
    } catch {
      throw new BadRequestException('Payload must be valid JSON');
    }

    return this.contractsService.fullGenerate(parsedPayload, file);
  }

  @Post(':id/estimate')
  @UseInterceptors(FileInterceptor('file'))
  attachEstimate(@Param('id') id: string, @UploadedFile() file?: EstimateUploadFile) {
    return this.contractsService.attachEstimate(Number(id), file);
  }

  @Post(':id/generate')
  generate(@Param('id') id: string) {
    return this.contractsService.generate(Number(id));
  }

  @Get()
  findAll() {
    return this.contractsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractsService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateContractDto) {
    return this.contractsService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractsService.remove(Number(id));
  }
}
