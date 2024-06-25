import axios from 'axios';
import { CreateMovieDto } from '../../dto/createMovie.dto';

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URL || 'http://localhost:3000';

// Return all movies in My Library
export const getMovies = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/movies`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar filmes:', error);
        throw error;
    }
};

// Add a movie to My Library
export const addMovie = async (movieData: CreateMovieDto) => {
    try {
        const response = await axios.post(`${BASE_URL}/movies`, movieData);
        return response.data;
    } catch (error) {
        console.error("Erro ao adicionar filme à library:", error);
        throw error;
    }
};

// Remove a movie from My Library
export const removeMovie = async (movieId: number) => {
    try {
        const response = await axios.delete(`${BASE_URL}/movies/${movieId}`);
        return response.status;
    } catch (error) {
        console.error(`Erro ao remover filme com ID ${movieId}:`, error);
        throw error;
    }
}