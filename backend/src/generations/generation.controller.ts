import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateGenerationDto } from './dto/create-generation.dto';
import { GenerationService } from './generation.service';

@Controller('generations')
export class GenerationController {
  constructor(private readonly generationService: GenerationService) {}

  @Post()
  create(@Body() data: CreateGenerationDto) {
    return this.generationService.create(data);
  }

  @Get()
  findAll() {
    return this.generationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.generationService.findOne(Number(id));
  }
}
