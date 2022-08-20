import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import * as firebase from 'firebase';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading:true
    }
    this.db =firebase.firestore();
  }
  componentDidMount (){
    // firebase
    //   .firestore()
    //   .collection('products')//this will return collection
    //   .get()//this will return a promise
    //   .then((snapshot)=>{
    //     console.log(snapshot);
    //     snapshot.docs.map((doc)=>{
    //       console.log(doc.data());
    //     });
    //     const products = snapshot.docs.map((doc)=>{

    //       const data =doc.data();
    //       data['id']= doc.id;
    //       return data;
    //     });

    //     this.setState({
    //       products :products,
    //       loading :false
    //     })
    //   })
    this.db
      .collection('products')//this will return collection
      // .where('price','>=',999)
      .orderBy('price','desc')
      .onSnapshot((snapshot)=>{
        console.log(snapshot);
        snapshot.docs.map((doc)=>{
          console.log(doc.data());
        });
        const products = snapshot.docs.map((doc)=>{

          const data =doc.data();
          data['id']= doc.id;
          return data;
        });

        this.setState({
          products :products,
          loading :false
        })
      })
  }
  handleIncreaseQuantity = (product) => {
    console.log('increase the quantity', product);
    const { products } = this.state;
    const index = products.indexOf(product);

    // products[index].qty += 1;
    // this.setState({
    //   products: products
    // })
    const docRef =this.db.collection('products').doc(products[index].id);
    docRef
    .update({
      qty:products[index].qty+1
    })
    .then(()=>{
      console.log('Updated successfully');
    })
    .catch((err)=>{
      console.log('Error ' ,err);
    })
  }

  handleDecreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);
    if (products[index].qty == 0) {
      return;
    }
    // products[index].qty -= 1;
    // this.setState({
    //   products
    // })
    const docRef =this.db.collection('products').doc(products[index].id);//find by id of the prodct in products array
    docRef
    .update({
      qty :products[index].qty-1
    })
    .then(()=>{
      console.log('updated Successfully');
    })
    .catch((err)=>{
      console.log('Error :', err);
    })

  }

  handleDeleteProduct = (id) => {
    const { products } = this.state;

    // const items = products.filter((item) => item.id !== id);
    // this.setState({
    //   products: items
    // })
    const docRef =this.db.collection('products').doc(id);

    docRef
    .delete()
    .then(()=>{
      console.log('Deleted Successfully');
    })
    .catch((err)=>{
      console.log("Error" , err);
    });
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
  addProduct=()=>{
    this.db
      .collection('products')
      .add({
        img:'',
        price:9900,
        qty:1,
        title: 'Washing Machine'
      })
      .then((docRef)=>{
        console.log('product has been added', docRef);
      })
      .catch((error)=>{
        console.log('Error' ,error);
      })
  }
  render() {
    const {products,loading}= this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        <button onClick={this.addProduct} style={{padding:20, fontSize:20}}> Add a Product</button>
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        {loading && <h1> Loading Products... </h1>}
        <div style={{padding:20,fontSize:'28px'}}>Total: {this.getCartTotal()}</div>
      </div>
    );
  }
}

export default App;
