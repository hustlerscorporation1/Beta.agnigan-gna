import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ContactsService } from './contacts.service';
import { ContactStatus } from '../../common/entities/contact.entity';

@ApiTags('contacts')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new contact message' })
  async create(@Body() createContactDto: any) {
    return await this.contactsService.create(createContactDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all contacts' })
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('status') status: ContactStatus,
  ) {
    return await this.contactsService.findAll(page, limit, status);
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Get contact statistics' })
  async getStatistics() {
    return await this.contactsService.getStatistics();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a contact by ID' })
  async findOne(@Param('id') id: string) {
    return await this.contactsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a contact' })
  async update(@Param('id') id: string, @Body() updateContactDto: any) {
    return await this.contactsService.update(id, updateContactDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a contact' })
  async remove(@Param('id') id: string) {
    await this.contactsService.remove(id);
  }
}
