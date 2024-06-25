import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Movie } from '../movies/movie.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  review_id: number;

  @Column()
  content: string;

  // IMPLEMENTAÇÃO DO BLOB PARA AUDIO
  // @Column({ type: 'bytea', nullable: true })
  // audio: Buffer;

  @OneToOne(() => Movie, (movie) => movie.review, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;
}
