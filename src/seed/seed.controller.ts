import { Controller, Delete, Post } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post()
  runSeed() {
    return this.seedService.runSeed();
  }

  @Delete()
  restartData() {
    return this.seedService.restartData();
  }

}
