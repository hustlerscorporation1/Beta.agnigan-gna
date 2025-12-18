import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsOptional, IsInt, Min } from 'class-validator';
import { PropertyType, PropertyStatus } from '../../../common/entities/property.entity';

export class CreatePropertyDto {
  @ApiProperty({ description: 'Titre de la propriété' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Prix' })
  @IsString()
  @IsNotEmpty()
  price: string;

  @ApiProperty({ description: 'Localisation' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ description: 'Type de propriété', enum: PropertyType, required: false })
  @IsEnum(PropertyType)
  @IsOptional()
  type?: PropertyType;

  @ApiProperty({ description: 'Statut', enum: PropertyStatus, required: false })
  @IsEnum(PropertyStatus)
  @IsOptional()
  status?: PropertyStatus;

  @ApiProperty({ description: 'Superficie', required: false })
  @IsString()
  @IsOptional()
  area?: string;

  @ApiProperty({ description: 'Nombre de chambres', required: false })
  @IsInt()
  @Min(0)
  @IsOptional()
  bedrooms?: number;

  @ApiProperty({ description: 'Nombre de salles de bain', required: false })
  @IsInt()
  @Min(0)
  @IsOptional()
  bathrooms?: number;

  @ApiProperty({ description: 'URL de l\'image', required: false })
  @IsString()
  @IsOptional()
  image?: string;
}
