import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Review } from '../review/review.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  movie_id: number;

  @Column()
  title: string;

  @Column()
  year: string;

  @Column('float')
  imdb_rating: number;

  @OneToOne(() => Review, (review) => review.movie, {
    nullable: true,
  })
  review?: Review;
}
