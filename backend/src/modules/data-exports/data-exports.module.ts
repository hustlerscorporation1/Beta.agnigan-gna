import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataExport } from '../../common/entities/data-export.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DataExport])],
  controllers: [],
  providers: [],
  exports: [],
})
export class DataExportsModule {}
