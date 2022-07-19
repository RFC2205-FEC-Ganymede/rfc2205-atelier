// import React, { Component } from 'react';
// import axios from 'axios';

// function RelatedOutfits(props, { relatedProductsInfo, onClick }) {

//   const { name, category } = props;

//   return (
//     <section>
//       <h2>Your Outfits</h2>
//       <div>
//       <img src={"https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png"} width="150" height="150"></img>
//       <h4>NAME</h4>
//         <sup>
//           <button onClick={(e)=>props.onClick}> ❌ </button>
//         </sup>
//         <p> CATEGORY</p>
//         <small>PRICE</small>
//         <h5>RATING</h5>

//       </div>

//     </section>
//   );
// }

// export default RelatedOutfits;

import React, { Component } from 'react';
import axios from 'axios';
import AddCard from './relatedAddCard.jsx';
import { Carousel } from 'react-bootstrap';
import App from '../index.jsx';
import Card from 'react-bootstrap/Card';
import OutfitCard from './relatedOutfitCard.jsx';



class RelatedOutfitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // relatedProducts: this.props.relatedProducts,
      // allProducts: this.props.allProducts,
      // relatedProductsInfo: [],
      // relatedStylesInfo: this.props.relatedStylesInfo,
      outfitCardsArray: [
        {
          productName: null,
          productCategory: null,
          productImage: null,
          productPrice: null,
          productRating: null
        }],
      productSpecs: this.props.productSpecs,
      productStyles: this.props.productStyles,
    }

  }

  clickEvent = () => {
    const newOutfit = {
      productName: this.props.productSpecs.name,
      productCategory: this.props.productSpecs.category,
      productImage: this.props.productStyles.results[0].photos[0].thumbnail_url,
      productPrice: this.props.productStyles.results.length !== 0 && this.props.productStyles.results[0].sale_price === null ?
      this.props.productStyles.results[0].original_price : this.props.productStyles.results.length !== 0 && props.productStyles.results[0].sale_price !== null ? this.props.productStyles.results[0].sale_price : null,
      productRating: this.props.metaData.ratings
    }
    const pName = newOutfit.productName;
    let inArr = false;
    for (let i = 0; i < this.state.outfitCardsArray.length; i++) {
      let curItemName = this.state.outfitCardsArray[i].productName;
      if (curItemName === pName) {
        inArr = true
        break
      }
    }
    let outfitCardsArray = [
      ...this.state.outfitCardsArray
    ]
    if (!inArr) {
      outfitCardsArray.push(newOutfit)
    } else {
      alert("Item already in outfits")
    }

    this.setState({ outfitCardsArray });


  }



  render() {
    const { outfitCardsArray } = this.state;
    return (

      <Carousel variant={"dark"} interval={null} >
        <Carousel.Item
          show={4}>
          <AddCard
            onClick={this.clickEvent}
          />
        </Carousel.Item>
        {outfitCardsArray.map((card, index) => (
          (card.productName) ?
            <Carousel.Item>
              <OutfitCard
                productName={card.productName}
                productCategory={card.productCategory}
                productImage={card.productImage}
                productPrice={card.productPrice}
                productRating={card.productRating}
                key={index}
              />
            </Carousel.Item> : null))}
      </Carousel>

    )


  }
}

export default RelatedOutfitList