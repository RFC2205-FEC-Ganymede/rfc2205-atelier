import React from 'react';
import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

class StyleSelectionHelper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
      product_id: undefined,
    }
  }

  static getDerivedStateFromProps = (nextProps, state) => {
    // console.log('getDerived', nextProps, state)
    if (nextProps.productStyles.results) {
      if (state.selected === undefined) {
        return {selected: nextProps.productStyles.results[0].style_id};
      }
    }
  }

  onSale = (sale_price) => {
    if (sale_price !== null) {
        return sale_price;
      }
  }

  clickevenlist = (e) => {
    this.setState({
      selected: e.target.className,
    }, () => {
      this.props.onThumbnailClick(e)
      var x = document.getElementsByClassName('styles-section-forThumb')
      for (var i = 0; i < x[0].childNodes.length; i++) {
        if (Number(this.state.selected) === Number(x[0].childNodes[i].className)) {
          x[0].childNodes[i].style.border = '5px solid #428047';
        } else {
          x[0].childNodes[i].style.border = '';
        }
      }
    })
  }

  render () {
    if (this.props.productStyles.results !== undefined && this.props.productStyles.results.length !== 0 && this.props.productStyles.results[0].photos[0].thumbnail_url !== null) {
      return (
        <React.Fragment>
          <section style={{marginBottom: 8}} className='styles-section-forThumb'>
            {this.props.productStyles.results.map((styleVals, i) => {
                return <img
                        className={`${styleVals.style_id}`}
                        onClick={this.clickevenlist}
                        key={i}
                        index={i}
                        src={styleVals.photos[0].thumbnail_url}
                        name={styleVals.name}
                        style_id={styleVals.style_id}
                        price={styleVals.original_price}
                        sale={this.onSale(styleVals.sale_price)}
                        style={{
                          resizeMode: "center",
                          height: 100,
                          width: 100,
                          margin: 5,
                          borderRadius: '50%'
                        }}
                       />
            })}
          </section>
        </React.Fragment>
      )
    } else if (this.props.productStyles.results !== undefined && this.props.productStyles.results.length !== 0 && this.props.productStyles.results[0].photos[0].thumbnail_url === null) {
      return (
        <React.Fragment>
          <section>
            {this.props.productStyles.results.map((styleVals, j) => {
                return <img
                        className='styles-selection-img'
                        onClick={this.props.onThumbnailClick}
                        key={j}
                        src={"https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png"}
                        name={styleVals.name}
                        style_id={styleVals.style_id}
                        price={styleVals.original_price}
                        sale={this.onSale(styleVals.sale_price)}
                        style={{
                          resizeMode: "center",
                          height: 120,
                          width: 120
                        }}
                       />
            })}
          </section>
        </React.Fragment>
      )
    }
  }
}

export default StyleSelectionHelper;
