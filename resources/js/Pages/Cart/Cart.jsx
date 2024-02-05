// Pages/Cart/Cart.jsx

import { Link } from "@inertiajs/react";
import Footer from "@/Components/Footer/Footer";
import { CartContext } from "@/Store/CartContext";
import Table from "@/Components/Cart/Method/Table";
import Input from "@/Components/Cart/Method/Input";
// import Header from "@/Components/Cart/Method/Header";
import Button from "@/Components/Cart/Method/Button";
import { useContext, useEffect, useState } from "react";

const ColumnsWrapper = ({ children }) => (
    <div className="w-full md:flex md:flex-col text-black my-10">
        {children}
    </div>
);

const Box = ({ children }) => (
    <div className="bg-white rounded-lg p-4 my-2 text-black md:w-3/5">
        {children}
    </div>
);

const FixedOrderBox = ({ children }) => (
    <div className="top-1/2 md:right-0 md:fixed w-full md:w-80 max-h-90vh overflow-y-auto md:transform md:-translate-y-1/2">
        {children}
    </div>
);

const ProductInfoCell = ({ children }) => <td className="py-2">{children}</td>;

const ButtonPP = ({ children, ...props }) => (
    <Button
        className="my-3 p-2 px-3 md:p-3 md:px-4 hover:bg-yellow-700 hover:text-white rounded-md border border-yellow-700"
        {...props}
    >
        {children}
    </Button>
);

const ProductImageBox = ({ children }) => (
    <div className="w-12 h-16 md:w-20 md:h-20 p-1 border border-solid border-gray-200 flex items-center justify-center rounded-lg">
        {children}
    </div>
);

const QuantityLabel = ({ children }) => (
    <span className="block md:inline-block px-4">{children}</span>
);

const CityHolder = ({ children }) => (
    <div className="flex gap-2">{children}</div>
);

const RemoveButton = ({ onClick }) => (
    <Button
        onClick={onClick}
        className="bg-red-500 border rounded-md p-1 text-sm text-white hover:bg-transparent hover:border-red-500 hover:text-red-500"
    >
        Remove
    </Button>
);

export default function CartPage() {
    const { user, cartProducts, addProduct, removeProduct, clearCart } =
        useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [country, setCountry] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (user && cartProducts.length > 0) {
                const response = await axios.post("/api/cart", {
                    ids: cartProducts,
                });
                setProducts(response.data);
            } else {
                const storedCart = localStorage.getItem("cart");
                if (storedCart) {
                    setProducts(JSON.parse(storedCart));
                }
            }
        };

        fetchData();
    }, [user, cartProducts]);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }
        if (window.location.href.includes("success")) {
            setIsSuccess(true);
            clearCart();
        }
    }, []);

    function moreOfThisProduct(id) {
        const productToUpdate = cartProducts.find((p) => p.id === id);
        if (productToUpdate) {
            addProduct({
                ...productToUpdate,
                quantity: productToUpdate.quantity + 1,
            });
        }
    }

    function lessOfThisProduct(id) {
        const productToUpdate = cartProducts.find((p) => p.id === id);
        if (productToUpdate && productToUpdate.quantity > 1) {
            removeProduct({
                ...productToUpdate,
                quantity: productToUpdate.quantity - 1,
            });
        }
    }

    async function goToPayment() {
        const response = await axios.post("/api/checkout", {
            name,
            email,
            city,
            postalCode,
            streetAddress,
            country,
            cartProducts,
        });

        if (response.data.url) {
            window.location = response.data.url;
        }
    }

    // Calculate the total price of all products in the cart
    const total = products.reduce((acc, product) => {
        const cartProduct = cartProducts.find((p) => p.id === product.id);
        if (cartProduct && cartProduct.quantity > 0) {
            acc += product.price * cartProduct.quantity;
        }
        return acc;
    }, 0);

    if (isSuccess) {
        return total;
    }

    // Now `total` contains the total product price
    // console.log("Total Product Price:", total);

    if (isSuccess) {
        return (
            <>
                {/* <Header /> */}
                <ColumnsWrapper>
                    <Box>
                        <h1>Thanks for your order!</h1>
                        <p>We will email you when your order will be sent.</p>
                    </Box>
                </ColumnsWrapper>
                <Footer />
            </>
        );
    }

    // console.log("products", products);
    return (
        <>
            {/* <Header /> */}
            <ColumnsWrapper>
                <Box>
                    <h2>Cart</h2>
                    {!cartProducts?.length && <div>Your cart is empty</div>}
                    {products?.length > 0 && (
                        <Table>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <ProductInfoCell>
                                            <ProductImageBox>
                                                {product.image &&
                                                product.image.length > 0 ? (
                                                    <Link
                                                        href={`product/${product.id}`}
                                                    >
                                                        <img
                                                            width={300}
                                                            height={400}
                                                            src={product.image}
                                                            alt={product.title}
                                                        />
                                                    </Link>
                                                ) : (
                                                    <div>No Image</div>
                                                )}
                                            </ProductImageBox>
                                            {product.title}
                                        </ProductInfoCell>
                                        <td>
                                            <Button
                                                onClick={() =>
                                                    lessOfThisProduct(
                                                        product.id
                                                    )
                                                }
                                            >
                                                -
                                            </Button>
                                            <QuantityLabel>
                                                {cartProducts
                                                    .filter(
                                                        (item) =>
                                                            item.id ===
                                                            product.id
                                                    )
                                                    .reduce(
                                                        (acc, item) =>
                                                            acc + item.quantity,
                                                        0
                                                    )}
                                            </QuantityLabel>
                                            <Button
                                                onClick={() =>
                                                    moreOfThisProduct(
                                                        product.id
                                                    )
                                                }
                                            >
                                                +
                                            </Button>
                                        </td>
                                        <td>
                                            $
                                            {product.price *
                                                cartProducts
                                                    .filter(
                                                        (item) =>
                                                            item.id ===
                                                            product.id
                                                    )
                                                    .reduce(
                                                        (acc, item) =>
                                                            acc + item.quantity,
                                                        0
                                                    )}
                                        </td>
                                        <td>
                                            <RemoveButton
                                                onClick={() =>
                                                    removeProduct(product)
                                                }
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>Total:</td>
                                    <td>${total}</td>
                                </tr>
                            </tfoot>
                        </Table>
                    )}
                </Box>
                {!!cartProducts?.length && (
                    <FixedOrderBox className="h-72 w-auto">
                        <div className="bg-white rounded-lg p-4 text-black w-auto">
                            <h2>Order information</h2>
                            <Input
                                type="text"
                                placeholder="Name"
                                value={name}
                                name="name"
                                onChange={(ev) => setName(ev.target.value)}
                            />
                            <Input
                                type="text"
                                placeholder="Email"
                                value={email}
                                name="email"
                                onChange={(ev) => setEmail(ev.target.value)}
                            />
                            <CityHolder>
                                <Input
                                    type="text"
                                    placeholder="City"
                                    value={city}
                                    name="city"
                                    onChange={(ev) => setCity(ev.target.value)}
                                />
                                <Input
                                    type="text"
                                    placeholder="Postal Code"
                                    value={postalCode}
                                    name="postalCode"
                                    onChange={(ev) =>
                                        setPostalCode(ev.target.value)
                                    }
                                />
                            </CityHolder>
                            <Input
                                type="text"
                                placeholder="Street Address"
                                value={streetAddress}
                                name="streetAddress"
                                onChange={(ev) =>
                                    setStreetAddress(ev.target.value)
                                }
                            />
                            <Input
                                type="text"
                                placeholder="Country"
                                value={country}
                                name="country"
                                onChange={(ev) => setCountry(ev.target.value)}
                            />
                            <ButtonPP black block onClick={goToPayment}>
                                Continue to payment
                            </ButtonPP>
                        </div>
                    </FixedOrderBox>
                )}
            </ColumnsWrapper>
            <Footer />
        </>
    );
}
