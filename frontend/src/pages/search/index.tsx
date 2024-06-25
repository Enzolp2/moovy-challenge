import React, { useState } from "react";
import { Box, FormControl, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { searchAndFetchDetails } from "../../services/omdbDataService";
import MovieCard from "../../components/movieCard/MovieCard";
import { CreateMovieDto } from "../../dto/createMovie.dto";
import { addMovie } from "../../services/api/movieService";
import Message from "../../components/message/messageCard";

const Search = () => {
    const [movieTitle, setMovieTitle] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // message settings
    const [messageOpen, setMessageOpen] = useState(false);
    const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('success');
    const [messageContent, setMessageContent] = useState('');

    const handleSearchButton = async () => {
        try {
            setLoading(true);
            const result = await searchAndFetchDetails(movieTitle);
            if (result) {
                setSearchResults(result);
            } else {
                setSearchResults([]);
            }
        } catch (error) {
            console.error('Erro ao buscar filmes:', error);
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };
    const handleAddToLibrary = async (movie: any) => {
        try {
          const movieData: CreateMovieDto = {
            title: movie.title,
            year: movie.year,
            imdb_rating: parseFloat(movie.imdbRating)
          };
    
          await addMovie(movieData);
    
          setMessageType('success');
          setMessageContent(`Movie "${movie.title}" adicionado à sua Library.`);
          setMessageOpen(true);
    
        } catch (error) {
          console.error(`Erro ao adicionar ${movie.title} à My Library:`, error);
          setMessageType('error');
          setMessageContent(`Falha ao adicionar o movie "${movie.title}".`);
          setMessageOpen(true);
        }
      };

    const handleCloseMessage = () => {
        setMessageOpen(false);
      };
    

    return (
        <Box sx={{ marginX: "300px", display: "flex", flexDirection: "column" }}>
            <Typography variant="h4" gutterBottom>
                Search
            </Typography>
            <FormControl sx={{ m: 1, width: '50rem' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Search Movie</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    endAdornment={
                        <InputAdornment position="end">
                            <SearchIcon 
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: 'primary.main',
                                    }
                                }}
                                onClick={handleSearchButton}
                            />
                        </InputAdornment>
                    }
                    label="Search Movie"
                    value={movieTitle}
                    onChange={(e) => setMovieTitle(e.target.value)}
                />
            </FormControl>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                {loading && <Typography variant="body1" sx={{marginTop: "10px"}}>Carregando...</Typography>}

                {searchResults.map((movie, index) => (
                    <MovieCard 
                        key={index}
                        title={movie.title}
                        imdbRating={movie.imdbRating  || 'N/A'}
                        year={movie.year || ''}
                        onAddToLibrary={() => handleAddToLibrary(movie)}
                    />
                ))}

                {searchResults.length === 0 && !loading && (
                    <Typography variant="body1" sx={{marginTop: "10px"}}>Nenhum filme encontrado.</Typography>
                )}
            </Box>

            <Message
                open={messageOpen}
                onClose={handleCloseMessage}
                message={messageContent}
                type={messageType}
            />
        </Box>
    );
};

export default Search;
