import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ICandidateFilter } from 'src/candidate/services/candidate.service';
import { CandidateProgramService } from '../candidate-program.service';
import { CreateCandidateProgramDTO } from '../dto/create-candidate-program.dto';
import { UpdateCandidateProgramDTO } from '../dto/update-candidate-program.dto';

@UseGuards(AuthGuard('jwt-coordinator'))
@Controller('coordinator/candidate-programs')
export class CoordinatorCandidateProgramController {
  constructor(
    private readonly candidateProgramService: CandidateProgramService,
  ) { }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createCandidateProgramDto: CreateCandidateProgramDTO) {
    return this.candidateProgramService.create(createCandidateProgramDto);
  }

  @Get()
  async getAllCandidteProgramsOfInstitute
    (@Request() req: any, @Query() queryParams: ICandidateFilter) {
      try {
        return await this.candidateProgramService.findAllCandidateProgramsOfInstitute(req.user.id, queryParams);
      } catch (error) {
        throw error;
      }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.candidateProgramService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCandidateProgramDto: UpdateCandidateProgramDTO,
  ) {
    return this.candidateProgramService.update(+id, updateCandidateProgramDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.candidateProgramService.remove(+id);
  }
}
