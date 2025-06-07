import { useDispatch, useSelector } from "react-redux";
import { clearCart, decrementQty, incrementQty } from "../store/cartSlice";
import parse from "html-react-parser";
import { useMutation } from "@apollo/client";
import { CREATE_ORDER } from "../graphql/mutations";

const CartOverlay = ({ isCartOpen }) => {
    const cart = useSelector((state) => state.cart.items);
    const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const dispatch = useDispatch();

    const [createOrder, { loading, error }] = useMutation(CREATE_ORDER, {
        onCompleted: () => {
            dispatch(clearCart());
            console.log("Order placed successfully!");
        },
        onError: (err) => {
            console.log("Something went wrong: " + err.message);
        },
    });

    const handlePlaceOrder = () => {
        const formattedProducts = cart.map((item) => ({
            productId: parseInt(item.productId),
            quantity: item.quantity,
            selectedAttributes: Object.entries(item.selectedAttributes).map(([name, value]) => ({
                name,
                value,
            })),
        }));

        createOrder({
            variables: { products: formattedProducts },
        });
    };

    return (
        <>
            <div
                className={`absolute px-4 py-6 top-[100%] right-[10%] shadow bg-white z-50 flex flex-col gap-4 w-[400px] ${
                    !isCartOpen && "hidden "
                }`}
            >
                <h3 className="font-raleway">
                    <span className="font-bold">My Bag,</span> {totalItemsCount} items
                </h3>
                {/* cart items */}
                <div className="max-h-[400px] overflow-auto">
                    {totalItemsCount === 0 ? (
                        <p className="font-raleway text-gray-500">Cart is empty</p>
                    ) : (
                        cart.map((item) => (
                            <div key={item.productId} className="flex justify-between gap-2 mb-5">
                                <div className="w-[70%] flex justify-between gap-2">
                                    <div className="flex flex-col gap-2">
                                        <p className="text-xl">{item.product.name}</p>
                                        <p className="font-bold">
                                            ${item.product.prices[0].amount}
                                        </p>
                                        <div className="flex flex-col gap-2 my-3">
                                            {item.product.attributes.map((attr) => (
                                                <div key={attr.name}>
                                                    <h4 className="font-bold text-sm mb-1">
                                                        {attr.name}:
                                                    </h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {attr.values.map((val, i) => {
                                                            const isSelected =
                                                                item.selectedAttributes[
                                                                    attr.name
                                                                ] === val.label;
                                                            return (
                                                                <button
                                                                    key={i}
                                                                    className={`border-2 min-w-8 min-h-8 ${
                                                                        isSelected
                                                                            ? "border-black"
                                                                            : "border-gray-300"
                                                                    }`}
                                                                >
                                                                    {parse(val.rendered)}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-between items-center text-xl">
                                        <button
                                            className="border-1 border-black w-8 h-8 cursor-pointer"
                                            onClick={() => dispatch(incrementQty(item.productId))}
                                        >
                                            +
                                        </button>
                                        <p>{item.quantity}</p>

                                        <button
                                            className="border-1 border-black w-8 h-8 cursor-pointer"
                                            onClick={() => dispatch(decrementQty(item.productId))}
                                        >
                                            -
                                        </button>
                                    </div>
                                </div>
                                <div className="w-[30%]">
                                    <img
                                        src={item.product.gallery[0]}
                                        className="w-full"
                                        alt={item.product.name}
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {/* total price  */}
                <div className="flex justify-between font-semibold">
                    <p>Total Price:</p>
                    <p>
                        $
                        {cart
                            .reduce(
                                (acc, item) => acc + item.product.prices[0].amount * item.quantity,
                                0
                            )
                            .toFixed(2)}
                    </p>
                </div>
                {/* place order btn  */}
                <button
                    disabled={totalItemsCount === 0 || loading}
                    className={`px-6 py-3 rounded w-full uppercase ${
                        totalItemsCount === 0
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-primary text-white hover:bg-[#6ed388] cursor-pointer"
                    }`}
                    onClick={handlePlaceOrder}
                >
                    {loading ? "Loading..." : "Place order"}
                </button>
            </div>
        </>
    );
};

export default CartOverlay;
