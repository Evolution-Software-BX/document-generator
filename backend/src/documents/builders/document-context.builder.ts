import { Injectable } from '@nestjs/common';

@Injectable()
export class DocumentContextBuilder {
  build(contract: any) {
    const amount = Number(contract.amount);
    const prepaymentAmount = Number(contract.prepaymentAmount ?? 0);
    const postpaymentAmount = Number(contract.postpaymentAmount ?? 0);

    return {
      contract_number: contract.number,
      contract_date: this.formatDate(contract.date),
      client_name: contract.client?.shortName ?? contract.client?.name ?? '',
      amount: this.formatAmount(amount),
      amount_number: this.formatAmount(amount),
      amount_text: String(amount),
      prepayment_amount: this.formatAmount(prepaymentAmount),
      postpayment_amount: this.formatAmount(postpaymentAmount),
    };
  }

  private formatDate(value: Date | string) {
    const date = new Date(value);
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(date);
  }

  private formatAmount(value: number) {
    return new Intl.NumberFormat('ru-RU', {
      maximumFractionDigits: 2,
    }).format(value);
  }
}
