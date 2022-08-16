import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [
        {
          price: 99,
          title: 'Watch',
          qty: 1,
          img: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MKUQ3_VW_34FR+watch-45-stainless-graphite-cell-7s_VW_34FR_WF_CO?wid=750&hei=712&trim=1,0&fmt=p-jpg&qlt=95&.v=1632171067000,1645753506827',
          id: 1
        },
        {
          price: 999,
          title: 'Mobile Phone',
          qty: 10,
          img: 'https://images-na.ssl-images-amazon.com/images/I/71zGrrAe5NL._AC._SR360,460.jpg',
          id: 2
        },
        {
          price: 999,
          title: 'Laptop',
          qty: 4,
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYrGFNtsAUTYNnN-iKUDcc5Z0ZD88uc-U-2w&usqp=CAU',
          id: 3
        }
      ]
    }
    // this.increaseQuantity = this.increaseQuantity.bind(this);
    // this.testing();
  }
  handleIncreaseQuantity = (product) => {
    console.log('increase the quantity', product);
    const { products } = this.state;
    const index = products.indexOf(product);

    products[index].qty += 1;
    this.setState({
      products: products
    })
  }

  handleDecreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);
    if (products[index].qty == 0) {
      return;
    }
    products[index].qty -= 1;
    this.setState({
      products
    })
  }

  handleDeleteProduct = (id) => {
    const { products } = this.state;

    const items = products.filter((item) => item.id !== id);
    this.setState({
      products: items
    })
  }
  getCartCount=()=>{
    const {products} =this.state;

    let count=0;
    products.forEach((product)=>{
      count+=product.qty;
    })
    return count;
  }

  getCartTotal=()=>{
    const {products} =this.state;

    let total=0;
    products.forEach((product)=>{
      total+=product.price*product.qty;
    });
    return total;
  }
  render() {
    const {products}= this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        <div style={{padding:20,fontSize:'28px'}}>Total: {this.getCartTotal()}</div>
      </div>
    );
  }
}

export default App;
