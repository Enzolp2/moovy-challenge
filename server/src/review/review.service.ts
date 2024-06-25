import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { UpdateReviewDto } from './dto/updateReview.dto';
import { MoviesService } from 'src/movies/movies.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,

    private readonly movieService: MoviesService,
  ) {}

  async findAll(): Promise<Review[]> {
    return this.reviewsRepository.find({ relations: ['movie'] });
  }

  async findOne(review_id: number): Promise<Review> {
    const review = await this.reviewsRepository.findOne({
      where: { review_id },
      relations: ['movie'],
    });
    if (!review) {
      throw new NotFoundException(`Review with ID ${review_id} not found`);
    }
    return review;
  }

  async create(movieId: number, content: string): Promise<Review> {
    const movie = await this.movieService.findOne(movieId);

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${movieId} not found`);
    }

    const review = new Review();
    review.content = content;
    review.movie = movie;

    return this.reviewsRepository.save(review);
  }

  async update(
    review_id: number,
    updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    const review = await this.reviewsRepository.findOne({
      where: { review_id },
    });
    if (!review) {
      throw new NotFoundException(`Review with ID ${review_id} not found`);
    }

    review.content = updateReviewDto.content;

    return this.reviewsRepository.save(review);
  }
  async delete(review_id: number): Promise<void> {
    await this.reviewsRepository.delete(review_id);
  }
}
