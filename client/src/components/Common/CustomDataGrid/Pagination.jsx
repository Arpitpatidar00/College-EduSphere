// src/components/Pagination.js
import React from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { APP_COLORS } from '@/enums/Colors';

const Pagination = ({ totalRows, rowsPerPage, currentPage, onPageChange }) => {
    // Calculate total number of pages
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    // Handle "Back" button click
    const handleBack = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    // Handle "Forward" button click
    const handleForward = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5; // Show up to 5 page numbers at a time
        const half = Math.floor(maxPagesToShow / 2);
        let start = Math.max(1, currentPage - half);
        let end = Math.min(totalPages, currentPage + half);

        // Adjust start and end if near the beginning or end
        if (currentPage - half < 1) {
            end = Math.min(totalPages, maxPagesToShow);
            start = 1;
        }
        if (currentPage + half > totalPages) {
            start = Math.max(1, totalPages - maxPagesToShow + 1);
            end = totalPages;
        }

        // Add page numbers to the array
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        // Add first page and ellipsis if needed
        if (start > 1) {
            pages.unshift(1, '...');
        }

        // Add last page and ellipsis if needed
        if (end < totalPages) {
            pages.push('...', totalPages);
        }

        return pages;
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
            {/* Back Button */}
            <Button
                variant="outlined"
                onClick={handleBack}
                disabled={currentPage === 1}
                sx={{
                    borderRadius: '20px',
                    borderColor: APP_COLORS.secondary[800],

                    color: currentPage === 1 ? '#B0BEC5' : '#000',
                    mr: 2,
                    padding: '6px 16px',
                    textTransform: 'none',
                }}
            >
                Back
            </Button>

            {/* Page Numbers */}
            {getPageNumbers().map((page, index) => (
                <React.Fragment key={index}>
                    {page === '...' ? (
                        <Typography sx={{ mx: 1, color: '#000' }}>...</Typography>
                    ) : (
                        <IconButton
                            onClick={() => onPageChange(page)}
                            sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                border: '1px solid #E0E0E0',
                                backgroundColor: currentPage === page ? APP_COLORS.primary[800] : '#fff',
                                color: currentPage === page ? '#fff' : '#000',
                                mx: 0.5,
                                '&:hover': {
                                    backgroundColor: currentPage === page ? APP_COLORS.primary[800] : '#F5F5F5',
                                },
                            }}
                        >
                            {page}
                        </IconButton>
                    )}
                </React.Fragment>
            ))}

            {/* Forward Button */}
            <Button
                variant="outlined"
                onClick={handleForward}
                disabled={currentPage === totalPages}
                sx={{
                    borderRadius: '20px',
                    borderColor: '#E0E0E0',
                    color: currentPage === totalPages ? '#B0BEC5' : '#000',
                    ml: 2,
                    padding: '6px 16px',
                    textTransform: 'none',
                }}
            >
                Forward
            </Button>
        </Box>
    );
};

export default Pagination;