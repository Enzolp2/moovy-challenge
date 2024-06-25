import axios from 'axios';
import { CreateReviewDto } from '../../dto/createReview.dto';

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URL || 'http://localhost:3000';

// Retorna todas as reviews
export const getReviews = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/reviews`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar revisões:', error);
        throw error;
    }
};

// Add review to movie
// CreateReviewDto: movieId, content
export const addReview = async (reviewData: CreateReviewDto) => {
    try {
        const response = await axios.post(`${BASE_URL}/reviews`, reviewData);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar revisão:', error);
        throw error;
    }
};

// Update review content
export const updateReview = async (reviewId: number, content: string) => {
    try {
        const response = await axios.put(`${BASE_URL}/reviews/${reviewId}`, { content });
        return response.data;
    } catch (error) {
        console.error(`Erro ao atualizar revisão com ID ${reviewId}:`, error);
        throw error;
    }
};

// Remove Review
export const removeReview = async (reviewId: number) => {
    try {
        const response = await axios.delete(`${BASE_URL}/reviews/${reviewId}`);
        return response.status;
    } catch (error) {
        console.error(`Erro ao remover revisão com ID ${reviewId}:`, error);
        throw error;
    }
};
