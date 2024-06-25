import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import StarRateIcon from '@mui/icons-material/StarRate';

interface MovieCardProps {
    title: string;
    imdbRating: string;
    year: string;
    onAddToLibrary: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, imdbRating, year, onAddToLibrary }) => {
    return (
        <Box sx={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '16px',
            margin: '8px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "start",
                flexDirection: "column",
            }}
            >
                <Typography variant="h6" fontWeight={"bold"}>{title} - {year}</Typography>
                <Box sx ={{
                    display: "flex",
                }}>
                    <StarRateIcon color="warning"/>
                    <Typography sx={{paddingTop: "2px", marginLeft: "5px"}}>
                        {imdbRating}
                    </Typography>
                </Box>
            </Box>
            <Button
            variant="contained"
            color="success"
            sx ={{ 
                display: "flex",
                alignItems: "center",
            }}
            onClick={onAddToLibrary}>
            <AddIcon sx={{marginRight: "5px"}}/>
            Add to My Library
            </Button>
        </Box>
    );
};

export default MovieCard;
