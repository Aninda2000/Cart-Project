import React from 'react';

class CartItem extends React.Component {
  render () {
    console.log('this.props', this.props);
    const { price, title, qty } = this.props.product;
    const{
        product,
        onIncreaseQuantity,
        onDecreaseQuantity,
        onDeleteProduct
    }=this.props;
    return (
      <div className="cart-item">
        {this.props.jsx}
        <div className="left-block">
          <img style={styles.image} />
        </div>
        <div className="right-block">
          <div style={ { fontSize: 25 } }>{title}</div>
          <div style={ { color: '#777' } }>Rs {price} </div>
          <div style={ { color: '#777' } }>Qty: {qty} </div>
          <div className="cart-item-actions">
            {/* Buttons */}
            <img
              alt="increase"
              className="action-icons"
              src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png"
              onClick={()=>{onIncreaseQuantity(this.props.product)}}
            />
            <img
              alt="decrease"
              className="action-icons"
              src="https://cdn-icons-png.flaticon.com/512/463/463700.png"
              onClick={()=>{onDecreaseQuantity(this.props.product)}}
            />
            <img
              alt="delete"
              className="action-icons"
              src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png"
              onClick={()=>{onDeleteProduct(product.id)}}
            />
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  image: {
    height: 110,
    width: 110,
    borderRadius: 4,
    background: '#ccc'
  }
}

export default CartItem;