import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { Review } from './review.entity';
import { CreateReviewDto } from './dto/createReview.dto';
import { UpdateReviewDto } from './dto/updateReview.dto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  async findAll(): Promise<Review[]> {
    return this.reviewService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') review_id: string): Promise<Review> {
    return this.reviewService.findOne(+review_id);
  }

  @Post()
  async create(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
    const { movieId, content } = createReviewDto;
    return this.reviewService.create(movieId, content);
  }

  @Put(':id')
  async update(
    @Param('id') review_id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    return this.reviewService.update(+review_id, updateReviewDto);
  }

  @Delete(':id')
  async delete(@Param('id') review_id: string): Promise<void> {
    return this.reviewService.delete(+review_id);
  }
}
