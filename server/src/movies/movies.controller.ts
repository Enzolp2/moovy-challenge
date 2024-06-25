import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './movie.entity';
import { CreateMovieDto } from './dto/createMovie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async findAll(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') movie_id: string): Promise<Movie> {
    return this.moviesService.findOne(+movie_id);
  }

  @Post()
  async create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.moviesService.create(createMovieDto);
  }

  @Put(':id')
  async update(
    @Param('id') movie_id: number,
    @Body() movie: Movie,
  ): Promise<Movie> {
    return this.moviesService.update(movie_id, movie);
  }

  @Delete(':id')
  delete(@Param('id') movie_id: string): Promise<void> {
    return this.moviesService.delete(+movie_id);
  }
}
