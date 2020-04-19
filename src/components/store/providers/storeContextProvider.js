import React, {Component} from 'react'
const MContext = React.createContext();  //exporting context object
class CartContextProvider extends Component
{
    constructor(){
        super()
        var user = JSON.parse(localStorage.getItem('User'));
        var cartItems;
        if(user !== null)
        {
        cartItems = JSON.parse(localStorage.getItem(`${user.ID}:Cart`))
        if(cartItems === null)
        {
            cartItems = []            
        }
        this.state = {
            message: "",
            ReloadCart: false,
            CartCount : cartItems !== null ? cartItems.length : 0
        }
    }
    }
    
    AddToCart=(id, prod)=>{
        var cartItems = JSON.parse(localStorage.getItem(`${id}:Cart`))
        if(cartItems === null)
        {
            cartItems = []            
        }
        cartItems.push({item : prod})
        localStorage.setItem(`${id}:Cart`, JSON.stringify(cartItems))        
        this.setState({CartCount : cartItems.length})
    }
    GetCartCount=()=>{
        return this.state.CartCount;
    }
render() {
        return (<>
            <MContext.Provider value={
            {
                state: {
                    ...this.state
                },
                actions: {
                    setReloadCart: (value) => this.setState({
                        ReloadCart: value
                    }),
                    AddCartCount: () => this.AddCartCount(),
                    RemoveCartCount: () => this.setState({
                        CartCount: this.state.CartCount - 1
                    }),
                    AddToCart: (id, prod) => this.AddToCart(id, prod),
                    GetCartCount: ()=>this.GetCartCount()
                },
            }}>
            {this.props.children}  
            </MContext.Provider>
            </>
            )
    }
}
export const Consumer = MContext.Consumer
export default CartContextProvider