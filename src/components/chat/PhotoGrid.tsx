"use client";

import { Box, ImageList, ImageListItem, Typography, IconButton, Modal, AppBar, Toolbar } from "@mui/material";
import { 
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  Download as DownloadIcon,
  Close as CloseIcon,
  NavigateBefore as PrevIcon,
  NavigateNext as NextIcon,
} from '@mui/icons-material';
import { useState } from "react";
import { format } from "date-fns";

interface PhotoGridProps {
  chatId: string;
}

// Mock data for photos
const MOCK_PHOTOS = [
  {
    id: "1",
    url: "https://source.unsplash.com/random/1200x800?nature",
    title: "Nature",
    sender: "John Doe",
    date: new Date(2024, 0, 1, 10, 30),
  },
  {
    id: "2",
    url: "https://source.unsplash.com/random/1200x800?city",
    title: "City",
    sender: "Jane Smith",
    date: new Date(2024, 0, 1, 11, 15),
  },
  {
    id: "3",
    url: "https://source.unsplash.com/random/1200x800?technology",
    title: "Technology",
    sender: "John Doe",
    date: new Date(2024, 0, 2, 14, 20),
  },
];

const PhotoGrid = ({ chatId }: PhotoGridProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);

  const handlePhotoClick = (index: number) => {
    setSelectedPhoto(index);
    setZoom(1);
  };

  const handleClose = () => {
    setSelectedPhoto(null);
    setZoom(1);
  };

  const handlePrev = () => {
    if (selectedPhoto !== null) {
      const newIndex = selectedPhoto > 0 ? selectedPhoto - 1 : MOCK_PHOTOS.length - 1;
      setSelectedPhoto(newIndex);
    }
  };

  const handleNext = () => {
    if (selectedPhoto !== null) {
      const newIndex = selectedPhoto < MOCK_PHOTOS.length - 1 ? selectedPhoto + 1 : 0;
      setSelectedPhoto(newIndex);
    }
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 0.5));
  };

  return (
    <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>Today</Typography>
        <ImageList variant="standard" cols={3} gap={8}>
          {MOCK_PHOTOS.map((photo, index) => (
            <ImageListItem 
              key={photo.id}
              onClick={() => handlePhotoClick(index)}
              sx={{
                cursor: 'pointer',
                overflow: 'hidden',
                borderRadius: 1,
                '& img': {
                  transition: 'transform 0.3s ease',
                },
                '&:hover img': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <img
                src={photo.url}
                alt={photo.title}
                loading="lazy"
                style={{
                  height: 200,
                  objectFit: 'cover',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  bgcolor: 'rgba(0, 0, 0, 0.6)',
                  color: 'white',
                  p: 1,
                }}
              >
                <Typography variant="caption" component="div">
                  {format(photo.date, "HH:mm")}
                </Typography>
              </Box>
            </ImageListItem>
          ))}
        </ImageList>
      </Box>

      <Modal
        open={selectedPhoto !== null}
        onClose={handleClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'rgba(0, 0, 0, 0.9)',
        }}
      >
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
          <AppBar position="fixed" color="transparent" elevation={0}>
            <Toolbar sx={{ justifyContent: 'flex-end', gap: 1 }}>
              <IconButton color="primary" onClick={handleZoomOut}>
                <ZoomOutIcon />
              </IconButton>
              <IconButton color="primary" onClick={handleZoomIn}>
                <ZoomInIcon />
              </IconButton>
              <IconButton color="primary" onClick={() => console.log('Download')}>
                <DownloadIcon />
              </IconButton>
              <IconButton color="primary" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          {selectedPhoto !== null && (
            <>
              <IconButton
                sx={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }}
                color="primary"
                onClick={handlePrev}
              >
                <PrevIcon />
              </IconButton>
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  maxWidth: '90%',
                  maxHeight: '90%',
                }}
              >
                <img
                  src={MOCK_PHOTOS[selectedPhoto].url}
                  alt={MOCK_PHOTOS[selectedPhoto].title}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '90vh',
                    transform: `scale(${zoom})`,
                    transition: 'transform 0.2s ease',
                  }}
                />
              </Box>
              <IconButton
                sx={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)' }}
                color="primary"
                onClick={handleNext}
              >
                <NextIcon />
              </IconButton>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  bgcolor: 'rgba(0, 0, 0, 0.6)',
                  color: 'white',
                  p: 2,
                }}
              >
                <Typography variant="body2">
                  {MOCK_PHOTOS[selectedPhoto].sender}
                </Typography>
                <Typography variant="caption" color="rgba(255, 255, 255, 0.7)">
                  {format(MOCK_PHOTOS[selectedPhoto].date, "MMM d, yyyy HH:mm")}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default PhotoGrid; 