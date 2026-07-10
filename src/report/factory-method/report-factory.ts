import { ReportType } from '../../common/enums';
import { Report } from '../../common/interfaces';

export abstract class ReportGenerator {
  abstract createReport(): Promise<Report>;

  async generateAndFormat(): Promise<string> {
    const report = await this.createReport();
    return this.formatReport(report);
  }

  protected formatReport(report: Report): string {
    return JSON.stringify(report, null, 2);
  }
}
