import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProblemDto } from './dto/create-problem.dto';
import { Problem } from '../entities/problem.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ProblemsService {
  constructor(
    @InjectRepository(Problem)
    private problemRepository: Repository<Problem>,
    private readonly httpService: HttpService,
  ) {}

  create(createProblemDto: CreateProblemDto) {
    return this.problemRepository.save(createProblemDto);
  }

  findAll() {
    return this.problemRepository.find();
  }

  findOne(id: number) {
    return this.problemRepository.findOneBy({ id: id });
  }

  // update(id: number, updateProblemDto: UpdateProblemDto) {
  //   return `This action updates a #${id} problem`;
  // }

  remove(id: number) {
    return this.problemRepository.delete(id);
  }
}
