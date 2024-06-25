export class CreateReviewDto {
    movieId: number;
    content: string;

    constructor(movieId: number, content: string) {
        this.movieId = movieId;
        this.content = content;
    }
}
