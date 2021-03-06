import React from 'react';
import { useEffect, useState } from 'react';
import StarRating from './starRatingsPO.jsx';
import avgRating from './starRatingsPO.jsx';

const ProdInfo = (props) => {

  let avgRating = (ratingsObj) => {
    let totalScore = 0;
    let ratings = numberOfRatings(ratingsObj);
    for (var key in ratingsObj) {
      let score = Number(ratingsObj[key]) * Number(key);
      totalScore += score ;
    }
    let avg = totalScore / ratings;
    avg = Math.round(avg * 10) / 10;
    return avg || 0.0
  }

  let numberOfRatings = (ratingsObj) => {
    let total = 0;
    for(var key in ratingsObj){
      let number = Number(ratingsObj[key])
      total += number
    }
    return total;
  }

  let styleNameOption = (props) => {
    if (props.thumbnailStyleClicked === '' && props.productStyles.results.length !== 0) {
      return props.productStyles.results[0].name;
    } else {
      return props.thumbnailStyleClicked;
    }
  }

  let priceOption = (props) => {
    if (props.productStyles.results.length !== 0 && props.productStyles.results[0].sale_price !== null) {
      return <p>${props.productStyles.results[0].sale_price}</p>
    } else if (props.thumbnailPrice === '' && props.productStyles.results.length !== 0) {
      return <p>${props.productStyles.results[0].original_price}</p>
    } else if (props.thumbnailSalePrice !== '' && props.productStyles.results.length !== 0) {
      return <React.Fragment><s>${props.thumbnailPrice}</s><p style={{color: 'red', marginBottom: 10}}>${props.thumbnailSalePrice}</p></React.Fragment>
    } else {
      return <p>${props.thumbnailPrice}</p>
    }
  }

  if (props.productStyles.results !== undefined) {
    return (
      <React.Fragment>
        {StarRating(avgRating(props.metaData.ratings))}
        <a href='#Ratings and Reviews'>Read all {numberOfRatings(props.metaData.ratings)} reviews</a>
        <p style={{marginTop: 5, marginBottom: 0}}>{props.productSpecs.category}</p>
        <h2 style={{margin: 0}}>{props.productSpecs.name}</h2>
        <p style={{margin: 0}}>{props.productSpecs.description}</p>
        <div className='price-container' style={{marginTop: 10, maxHeight: 30}}>{priceOption(props)}</div >
        <p style={{marginTop: 10, marginBottom: 0, fontWeight: 'bold'}}>Style > {styleNameOption(props)}</p>
      </React.Fragment>
    )
  }
}

export default ProdInfo;