import axios from 'axios';

const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;

if (!OMDB_API_KEY) {
    throw new Error('OMDB_API_KEY não está definida. Certifique-se de configurá-la no arquivo .env.');
}

const omdbApi = axios.create({
    baseURL: 'http://www.omdbapi.com/',
    params: {
        apikey: OMDB_API_KEY,
        type: "movie",
    },
});

// Busca filmes por Titulo
export const searchMovies = async (movieTitle: string) => {
    try {
        const response = await omdbApi.get('', {
            params: {
                s: movieTitle,
            },
        });
        return response.data.Search || [];
    } catch (error) {
        console.error('Erro ao buscar filmes:', error);
        throw error;
    }
};

// Busca detalhes do filme por imdbID
export const getMovieDetails = async (imdbID: string) => {
    try {
        const response = await omdbApi.get('', {
            params: {
                i: imdbID,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar detalhes do ID:", imdbID);
        throw error;
    }
};

// Busca e envia para o frontend os detalhes de cada filme
export const searchAndFetchDetails = async (movieTitle: string) => {
    try {
        const movies = await searchMovies(movieTitle);
        const detailedMovies = await Promise.all(movies.map(async (movie: any) => {
            const details = await getMovieDetails(movie.imdbID);
            return {
                title: details.Title,
                imdbRating: details.imdbRating,
                year: details.Year,
            };
        }));
        return detailedMovies;
    } catch (error) {
        console.error('Erro ao buscar filmes e obter detalhes:', error);
        throw error;
    }
};