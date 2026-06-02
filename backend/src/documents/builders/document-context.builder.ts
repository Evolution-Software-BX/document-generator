import { Injectable } from '@nestjs/common';

@Injectable()
export class DocumentContextBuilder {
  build(contract: any) {
    const amount = Number(contract.amount);
    const prepaymentAmount = this.getPaymentAmount(
      amount,
      contract.prepaymentPercent,
      contract.prepaymentAmount,
    );
    const postpaymentAmount = this.getPaymentAmount(
      amount,
      contract.postpaymentPercent,
      contract.postpaymentAmount,
    );
    const estimateWorks = this.buildEstimateWorks(contract.estimateJson);

    return {
      contract_number: contract.number,
      contract_date: this.formatDate(contract.date),
      contract_date_text: this.formatDate(contract.date),
      client_name: contract.client?.shortName ?? contract.client?.name ?? '',
      amount: this.formatAmount(amount),
      amount_number: this.formatAmount(amount),
      amount_text: String(amount),
      prepayment_amount: this.formatAmount(prepaymentAmount),
      postpayment_amount: this.formatAmount(postpaymentAmount),
      estimate_works: estimateWorks,
      estimate_total_amount: this.formatAmount(this.getEstimateTotalAmount(contract.estimateJson)),
      estimate_total_hours: this.getEstimateTotalHours(contract.estimateJson),
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

  private getPaymentAmount(amount: number, percent?: number | null, stored?: unknown) {
    if (typeof percent === 'number') {
      return (amount * percent) / 100;
    }

    return Number(stored ?? 0);
  }

  private buildEstimateWorks(estimateJson: any) {
    const stages = Array.isArray(estimateJson?.stages) ? estimateJson.stages : [];
    let index = 0;

    return stages.flatMap((stage: any) => {
      const works = Array.isArray(stage?.works) ? stage.works : [];

      return works.map((work: any) => {
        index += 1;

        return {
          index,
          name: String(work?.name ?? ''),
          amount: this.formatAmount(Number(work?.amount ?? 0)),
          total_hours: Number(work?.totalHours ?? 0),
          stage_title: stage?.title ?? work?.stageTitle ?? '',
        };
      });
    });
  }

  private getEstimateTotalAmount(estimateJson: any) {
    return Number(estimateJson?.totalAmount ?? 0);
  }

  private getEstimateTotalHours(estimateJson: any) {
    return Number(estimateJson?.totalHours ?? 0);
  }
}
