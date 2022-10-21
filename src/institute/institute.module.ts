import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstituteController } from './controllers/institute.controller';
import { InstituteService } from './services/institute.service';
import { Candidate } from './entities/candidate.entity';
import { Institute } from './entities/institute.entity';
import { S3Service } from './services/s3.service';
import { Photo } from './entities/photo.entitiy';


@Module({
  imports:[TypeOrmModule.forFeature([Candidate, Institute,Photo])],
  controllers: [InstituteController],
  providers: [InstituteService,S3Service]
})
export class InstituteModule {}
