import { Link } from "react-router-dom";
import whiteCart from "../assets/white-cart.png";

const ProductCard = ({ product }) => {
    return (
        <Link to={`/product/${product.id}`}>
            <div className="font-raleway p-4 rounded flex flex-col gap-3 group hover:shadow-lg transition duration-300 ease-in-out">
                <div className="h-80 w-full relative">
                    <img
                        src={product.gallery[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                    {!product.inStock && (
                        <div className="absolute top-0 left-0 w-full h-full bg-white/50 text-[#8D8F9A] flex items-center justify-center">
                            <p className="uppercase text-2xl font-light">out of stock</p>
                        </div>
                    )}
                    {product.inStock && (
                        <button
                            className="absolute -bottom-5 right-5 flex items-center justify-center shadow bg-primary h-[52px] w-[52px] rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out"
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                handleAddToCart(product); // أو أي لوجيك عندك
                            }}
                        >
                            <img src={whiteCart} alt="whiteCart" className="w-[50%]" />
                        </button>
                    )}
                </div>
                <div>
                    <h3 className="font-light text-xl">{product.name}</h3>
                    <p className="font-semibold">
                        {product.prices[0].currency.symbol} {product.prices[0].amount}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
