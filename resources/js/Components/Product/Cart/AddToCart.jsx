import React, { useContext } from "react";
import Button from "@/Components/Product/Button";
import CartIcon from "@/Components/icons/CartIcon";
import { usePage } from "@inertiajs/react";
import { CartContext } from "@/Store/CartContext";

function AddToCart({ product, className }) {
    const { addProduct, setCartProducts } = useContext(CartContext);
    const { auth } = usePage().props;

    const addToLocalStorage = (product) => {
        // Check if the product is already in localStorage
        const storedProducts = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProductIndex = storedProducts.findIndex(
            (p) => p.id === product.id
        );

        if (existingProductIndex !== -1) {
            // Update the quantity of the existing product
            storedProducts[existingProductIndex].quantity += 1;
        } else {
            // Add the product to localStorage with a quantity of 1
            storedProducts.push({ ...product, quantity: 1 });
        }

        // Update the localStorage with the modified products
        localStorage.setItem("cart", JSON.stringify(storedProducts));

        // Update the state in the context (if you're using context for the cart)
        setCartProducts(storedProducts);
    };

    const handleAddToCart = () => {
        // Call the addProduct method from CartContext with the product
        addProduct(product);
    
        // Check if the user is logged in
        // If logged in, you can send the product to the controller here
        // Implement your logic for sending the product to the controller
        // if (auth.user) {
        //     router.post('', values)
        // }
    };
    
    // addProduct({
    //   slug,
    //   title,
    //   price,
    //   image: images[0],
    //   quantity: 1,
    // })
    return (
        // <CartContextProvider>
            <Button
                onClick={handleAddToCart}
                className={`flex w-[95%] justify-center items-center m-auto border-gray-500 border-2 p-1 rounded-md shadow-md hover:bg-gray-500  hover:text-gray-50 px-2 py-2 mt-2 mb-1 ${className}`}
            >
                <CartIcon className="mx-1 w-4 ch " /> Add to Cart
            </Button>
        // </CartContextProvider>
    );
}

export default AddToCart;
