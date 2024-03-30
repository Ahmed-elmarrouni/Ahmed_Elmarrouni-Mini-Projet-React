const cartInitialState = {
    cart: [],
};

const cartSlice = (state = cartInitialState, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            const { id, name, image, description, price } = action.payload
            const newItem = {
                id: id,
                name: name,
                price: price,
                image: image,
                description: description,
            };
            const productIsExisted = state.cart.find((products) => products.id === id)

            if (productIsExisted) {
                alert("Product is already existe in cart")
            } else {
                return {
                    ...state,
                    cart: [...state.cart, newItem],
                };
            }
        case "DELETE_ITEM_CART":
            return {...state, cart: state.cart.filter((product) => product.id !== action.payload)}
        default:
            return state;
    }
};


// action creators

export const handleAddToCart = (prodDetails) => {
    return { type: "ADD_TO_CART", payload: prodDetails };
};

export const handleDeleteCart = (id) => {
    return { type: "DELETE_ITEM_CART", payload: id}
}

export default cartSlice;