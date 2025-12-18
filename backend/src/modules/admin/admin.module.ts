import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PropertiesModule } from '../properties/properties.module';
import { UsersModule } from '../users/users.module';
import { ContactsModule } from '../contacts/contacts.module';
import { TransactionsModule } from '../transactions/transactions.module';

@Module({
  imports: [PropertiesModule, UsersModule, ContactsModule, TransactionsModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
