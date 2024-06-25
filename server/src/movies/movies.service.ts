import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { CreateMovieDto } from './dto/createMovie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  // Get all Movies
  async findAll(): Promise<Movie[]> {
    return await this.moviesRepository.find({ relations: ['review'] });
  }

  // Get Movie by Id
  async findOne(movie_id: number): Promise<Movie> {
    return await this.moviesRepository.findOne({ where: { movie_id } });
  }

  // Create new Movie
  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const existingMovie = await this.moviesRepository.findOne({
      where: { title: createMovieDto.title },
    });

    if (existingMovie) {
      throw new ForbiddenException(
        'Este filme já foi adicionado anteriormente.',
      );
    }

    const newMovie = this.moviesRepository.create(createMovieDto);
    return await this.moviesRepository.save(newMovie);
  }

  // Update Movie by Id
  async update(movie_id: number, movie: Movie): Promise<Movie> {
    const updatedMovie = await this.moviesRepository.findOne({
      where: { movie_id },
    });
    this.moviesRepository.merge(updatedMovie, movie);
    return await this.moviesRepository.save(updatedMovie);
  }

  // Remove Movie by Id
  async delete(movie_id: number): Promise<void> {
    const movie = await this.moviesRepository.findOne({ where: { movie_id } });
    if (!movie) {
      throw new Error(`Filme com ID ${movie_id} não encontrado.`);
    }

    await this.moviesRepository.delete(movie_id);
  }
}
