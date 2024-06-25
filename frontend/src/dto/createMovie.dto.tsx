export class CreateMovieDto {
    title: string;
    year: string;
    imdb_rating: number;

    constructor(title: string, year: string, imdb_rating: number) {
        this.title = title;
        this.year = year;
        this.imdb_rating = imdb_rating;
    }
}
