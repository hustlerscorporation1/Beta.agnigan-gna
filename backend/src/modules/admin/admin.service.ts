import { Injectable } from '@nestjs/common';
import { PropertiesService } from '../properties/properties.service';
import { UsersService } from '../users/users.service';
import { ContactsService } from '../contacts/contacts.service';
import { TransactionsService } from '../transactions/transactions.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly propertiesService: PropertiesService,
    private readonly usersService: UsersService,
    private readonly contactsService: ContactsService,
    private readonly transactionsService: TransactionsService,
  ) {}

  async getDashboardStats() {
    const [properties, users, contacts, transactions] = await Promise.all([
      this.propertiesService.getStatistics(),
      this.usersService.getStatistics(),
      this.contactsService.getStatistics(),
      this.transactionsService.getStatistics(),
    ]);

    return {
      properties,
      users,
      contacts,
      transactions,
      overview: {
        totalProperties: properties.total,
        totalUsers: users.total,
        totalContacts: contacts.total,
        totalTransactions: transactions.total,
        revenue: transactions.totalAmount,
      },
    };
  }

  async getRecentActivities() {
    // Implement logic to fetch recent activities
    return {
      activities: [],
      message: 'Recent activities will be implemented with the activities module',
    };
  }
}
