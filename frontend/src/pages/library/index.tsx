import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import MyMovieCard from '../../components/movieCard/MyMovieCard';
import AddReviewDialog from '../../components/message/AddReviewDialog';
import ReviewDialog from '../../components/message/ReviewDialog';
import { getMovies, removeMovie } from '../../services/api/movieService';
import { addReview, updateReview } from '../../services/api/reviewService';
import { CreateReviewDto } from '../../dto/createReview.dto';
import Message from '../../components/message/messageCard';

interface Review {
  review_id: number;
  content: string;
}

interface Movie {
  movie_id: number;
  title: string;
  year: string;
  imdb_rating: number;
  review?: Review;
}

const Library = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [addReviewDialogOpen, setAddReviewDialogOpen] = useState(false);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const [messageOpen, setMessageOpen] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('success');


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const moviesData = await getMovies();
        setMovies(moviesData);
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

    const showMessage = (message: string, type: 'success' | 'error' | 'info') => {
        setMessageContent(message);
        setMessageType(type);
        setMessageOpen(true);
    };

    const handleCloseMessage = () => {
        setMessageOpen(false);
    };

    const handleDeleteMovie = async (movieId: number) => {
        try {
            await removeMovie(movieId);
            setMovies((prevMovies) => prevMovies.filter((movie) => movie.movie_id !== movieId));
            showMessage('Filme excluído com sucesso!', 'success');
        } catch (error) {
            console.log(`Erro ao excluir o filme com ID ${movieId}:`);
            showMessage(`Erro ao excluir o filme com ID ${movieId}:`, 'success');
        }
    };

    const handleAddReview = (movieId: number) => {
        setSelectedMovieId(movieId);
        setAddReviewDialogOpen(true);
    };

  const handleConfirmAddReview = async (content: string) => {
    if (selectedMovieId !== null) {
      const review = new CreateReviewDto(selectedMovieId, content);
      try {
        await addReview(review);
        const updatedMovies = await getMovies();
        setMovies(updatedMovies);
        showMessage('Review adicionada com sucesso!', 'success');
      } catch (error) {
        console.error('Erro ao adicionar review:', error);
        showMessage('Erro ao adicionar review.', 'error');
      }
    }
    setAddReviewDialogOpen(false);
    setSelectedMovieId(null);
  };

  const handleOpenReview = (movieId: number) => {
    const movie = movies.find((m) => m.movie_id === movieId);
    console.log(movie);
    if (movie) {
        setSelectedMovie(movie);
        setReviewDialogOpen(true);
    }
  };

  const handleCloseReviewDialog = () => {
    setReviewDialogOpen(false);
    setSelectedMovie(null);
  };

  const handleSaveReview = async (newContent: string) => {
    if (selectedMovie && selectedMovie.review) {
      try {
        await updateReview(selectedMovie.review.review_id, newContent);
        const updatedMovies = await getMovies();
        setMovies(updatedMovies);
        showMessage('Review atualizada com sucesso!', 'success');
      } catch (error) {
        console.error('Erro ao salvar review:', error);
        showMessage('Erro ao salvar review.', 'error');
      }
    }
    setReviewDialogOpen(false);
    setSelectedMovie(null);
  };

  return (
    <Box sx={{ marginX: '300px', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" gutterBottom>
        My Library
      </Typography>
      
      {loading ? (
        <Typography variant="body1">Carregando filmes...</Typography>
      ) : (
        movies.map((movie) => (
          <MyMovieCard
            key={movie.movie_id}
            title={movie.title}
            imdbRating={String(movie.imdb_rating)}
            year={movie.year}
            review_content={movie.review?.content || null}
            onDeleteMovie={() => handleDeleteMovie(movie.movie_id)}
            onAddReview={() => handleAddReview(movie.movie_id)}
            onOpenReview={() => handleOpenReview(movie.movie_id)}
          />
        ))
      )}
      
      <AddReviewDialog
        open={addReviewDialogOpen}
        onClose={() => setAddReviewDialogOpen(false)}
        onConfirm={handleConfirmAddReview}
      />

      <ReviewDialog
        open={reviewDialogOpen}
        onClose={handleCloseReviewDialog}
        title={selectedMovie?.title || ''}
        year={selectedMovie?.year || ''}
        reviewContent={selectedMovie?.review?.content || ''}
        onSave={handleSaveReview}
      />

      <Message
        open={messageOpen}
        onClose={handleCloseMessage}
        message={messageContent}
        type={messageType}
      />

    </Box>
  );
};

export default Library;
