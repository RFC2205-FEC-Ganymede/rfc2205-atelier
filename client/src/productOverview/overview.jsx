import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProdInfo from './prodInfo.jsx';
import ImageGallery from './imageGallery.jsx';
import StyleSelectionHelper from './styleSelectionHelper.jsx';
import AddToCart from './addToCart.jsx';


class ProdOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbnailClicked: '',
      thumbnailStyleClicked: '',
      thumbnailPrice: '',
      thumbnailSalePrice: '',
      thumbStyle: '411534',
      productStyles: {},
      selectedSize: '',
      currentIndex: 0,
    }
  }

  componentDidMount = () => {
    this.getProductStyles();
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.productSpecs.id !== prevProps.productSpecs.id) {
      this.getProductStyles(this.props.currentProduct);
      this.setState({
        thumbnailClicked: '',
        thumbnailStyleClicked: '',
        thumbnailPrice: '',
        thumbnailSalePrice: '',
        thumbStyle: '',
        selectedSize: '',
        selectedQuantity: '',
        currentIndex: 0,
        // addToCartButtonClick: false,
      })
    }
  }

  getProductStyles = () => {
    axios.get(`products/${this.props.currentProduct}/styles`)
      .then(res => {
        this.setState({
          productStyles: res.data,
        })
      })
      .catch(err => {console.log(err)})
  }

  onThumbnailClick = (e) => {
    // console.log('Clicked, ', e.target.attributes.style_id.value)
    const element = document.querySelector('.styles-selection-img');
    if (e.target.attributes.sale !== undefined) {
      this.setState({
        thumbnailClicked: e.target.currentSrc,
        thumbnailStyleClicked: e.target.name,
        thumbnailPrice: e.target.attributes.price.value,
        thumbnailSalePrice: e.target.attributes.sale.value,
        thumbStyle: e.target.attributes.style_id.value,
        currentIndex: e.target.attributes.index.value,
      })
    } else {
      this.setState({
        thumbnailClicked: e.target.currentSrc,
        thumbnailStyleClicked: e.target.name,
        thumbnailPrice: e.target.attributes.price.value,
        thumbnailSalePrice: '',
        thumbStyle: e.target.attributes.style_id.value,
        currentIndex: e.target.attributes.index.value,
      })
    }
  }

  onStylePhotosClick = (e) => {
    if (e.target.attributes.style_id !== undefined) {
      this.setState({
        thumbnailClicked: e.target.currentSrc,
        thumbStyle: e.target.attributes.style_id.value,
      })
    } else {
      this.setState({
        thumbnailClicked: e.target.currentSrc
      })
    }
  }

  sizeSelectionClick = (e) => {
    this.setState({
      selectedSize: e.target.value,
    })
  }

  quantitySelectionClick = (e) => {
    this.setState({
      selectedQuantity: e.target.value,
    })
  }

  render() {
    return (
      <React.Fragment>
        <ImageGallery
          currentProduct= {this.props.currentProduct}
          products={this.props.products}
          productSpecs={this.props.productSpecs}
          productStyles={this.state.productStyles}
          thumbnailClicked={this.state.thumbnailClicked}
          onStylePhotosClick={this.onStylePhotosClick}
          thumbStyle={this.state.thumbStyle}
        />
        <div className='overview-container'>
        <ProdInfo
          currentProduct= {this.props.currentProduct}
          products={this.props.products}
          productSpecs={this.props.productSpecs}
          productStyles={this.state.productStyles}
          thumbnailStyleClicked={this.state.thumbnailStyleClicked}
          thumbnailPrice={this.state.thumbnailPrice}
          thumbnailSalePrice={this.state.thumbnailSalePrice}
          metaData={this.props.metaData}
        />
        <StyleSelectionHelper
          currentProduct= {this.props.currentProduct}
          products={this.props.products}
          productSpecs={this.props.productSpecs}
          productStyles={this.state.productStyles}
          onThumbnailClick={this.onThumbnailClick}
          currentIndex={this.state.currentIndex}
          thumbStyle={this.state.thumbStyle}
        />
        <AddToCart
          currentProduct= {this.props.currentProduct}
          products={this.props.products}
          productSpecs={this.props.productSpecs}
          productStyles={this.state.productStyles}
          thumbStyle={this.state.thumbStyle}
          selectedSize={this.state.selectedSize}
          sizeSelectionClick={this.sizeSelectionClick}
          selectedQuantity={this.state.selectedQuantity}
          quantitySelectionClick={this.quantitySelectionClick}
          // addToTheCart={this.addToTheCart}
        />
        </div>
      </React.Fragment>
    )
  }
}

export default ProdOverview;
