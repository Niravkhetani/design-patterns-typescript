import { ReportType } from '../../common/enums';
import { Report } from '../../common/interfaces';
import { ReportGenerator } from '../factory-method/report-factory';
import { Logger } from '../../infrastructure/singleton/logger';

export class UserReportGenerator extends ReportGenerator {
  async createReport(): Promise<Report> {
    Logger.getInstance().info('Generating user report...');
    return {
      type: ReportType.USER,
      title: 'User Activity Report',
      generatedAt: new Date(),
      data: [
        { userId: 'USR-001', name: 'Alice', orders: 12, totalSpent: 1890.00 },
        { userId: 'USR-002', name: 'Bob', orders: 5, totalSpent: 450.00 },
        { userId: 'USR-003', name: 'Charlie', orders: 0, totalSpent: 0 },
      ],
      summary: {
        totalUsers: 3,
        activeUsers: 2,
        totalRevenue: 2340.00,
      },
    };
  }
}
