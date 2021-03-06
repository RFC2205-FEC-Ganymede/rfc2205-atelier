import React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';


export default function StarRating(rating) {


  if (rating) {
    return (
    <div className='starrating'>
      <Stack spacing={1}>
      <Rating precision={0.25} value={rating} size = "small" readOnly/>
      </Stack>
    </div>

    )
  } else {
    return null;
  }

}



