import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import StarRateIcon from '@mui/icons-material/StarRate';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DeleteConfirmationDialog from '../message/DeleteConfirmationDialog';

interface MyMovieCardProps {
    title: string;
    imdbRating: string;
    year: string;
    review_content: string | null;
    onDeleteMovie: () => void;
    onAddReview: () => void;
    onOpenReview: () => void;
}

const MyMovieCard: React.FC<MyMovieCardProps> = ({
    title,
    imdbRating,
    year,
    review_content,
    onDeleteMovie,
    onAddReview,
    onOpenReview
}) => {
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDeleteButtonClick = () => {
      setDialogOpen(true);
    };
  
    const handleDialogClose = () => {
      setDialogOpen(false);
    };
  
    const handleDeleteConfirm = () => {
      onDeleteMovie();
      setDialogOpen(false);
    };
  
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
                <Box sx={{
                    display: "flex",
                }}>
                    <StarRateIcon color="warning"/>
                    <Typography sx={{paddingTop: "2px", marginLeft: "5px"}}>
                        {imdbRating}
                    </Typography>
                </Box>
            </Box>
            <Box sx={{
                display: "flex",
                alignItems: "center",
            }}>
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleDeleteButtonClick}
                >
                    <DeleteIcon sx={{ marginRight: "5px" }} />
                    Delete Movie
                </Button>
                {!review_content ? (
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={onAddReview}
                    sx={{ marginLeft: "10px" }}
                >
                    <AddIcon sx={{ marginRight: "5px" }} />
                    Add Review
                </Button>
                ) : <Button
                variant="contained"
                color="success"
                onClick={onOpenReview}
                sx={{ marginLeft: "10px" }}
            >
                Open Review
                <KeyboardArrowRightIcon sx={{ marginRight: "5px" }} />
                </Button>
                }
            </Box>

            <DeleteConfirmationDialog
                open={dialogOpen}
                onClose={handleDialogClose}
                onConfirm={handleDeleteConfirm}
                title={title}
                hasReview={Boolean(review_content)}
            />
        </Box>
    );
};

export default MyMovieCard;
