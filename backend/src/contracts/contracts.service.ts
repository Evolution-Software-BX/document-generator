import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { ContractNumberService } from './services/contract-number.service';
import { ContractValidationService } from './services/contract-validation.service';

@Injectable()
export class ContractsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly contractNumberService: ContractNumberService,
    private readonly contractValidationService: ContractValidationService,
  ) {}

  async create(data: CreateContractDto) {
    const client = await this.prisma.client.findUnique({
      where: { id: data.clientId },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    const template = await this.prisma.template.findUnique({
      where: { id: data.templateId },
    });

    if (!template) {
      throw new NotFoundException('Template not found');
    }

    this.contractValidationService.validatePayment(data);

    const date = new Date(data.date);
    const number = await this.contractNumberService.nextNumber(date);
    const prepaymentAmount =
      data.prepaymentPercent === undefined
        ? undefined
        : (data.amount * data.prepaymentPercent) / 100;
    const postpaymentAmount =
      data.postpaymentPercent === undefined
        ? undefined
        : (data.amount * data.postpaymentPercent) / 100;

    return this.prisma.contract.create({
      data: {
        number,
        date,
        type: data.type,
        legalType: data.legalType,
        paymentType: data.paymentType,
        hasTz: data.hasTz ?? false,
        amount: data.amount,
        prepaymentPercent: data.prepaymentPercent,
        postpaymentPercent: data.postpaymentPercent,
        prepaymentAmount,
        postpaymentAmount,
        servicePeriodValue: data.servicePeriodValue,
        servicePeriodUnit: data.servicePeriodUnit,
        tzPeriodValue: data.tzPeriodValue,
        tzPeriodUnit: data.tzPeriodUnit,
        clientId: data.clientId,
        templateId: data.templateId,
      } as any,
      include: {
        client: true,
        template: true,
        generations: true,
      },
    });
  }

  findAll() {
    return this.prisma.contract.findMany({
      orderBy: { createdAt: 'desc' },
      include: { client: true, template: true },
    });
  }

  findOne(id: number) {
    return this.prisma.contract.findUnique({
      where: { id },
      include: { client: true, template: true, generations: true },
    });
  }

  update(id: number, data: UpdateContractDto) {
    return this.prisma.contract.update({
      where: { id },
      data: {
        ...data,
        date: data.date ? new Date(data.date) : undefined,
      } as any,
    });
  }

  remove(id: number) {
    return this.prisma.contract.delete({ where: { id } });
  }

  async nextNumber() {
    return { number: await this.contractNumberService.nextNumber() };
  }
}
