import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_PRODUCT_DETAILS } from "../graphql/queries";
import { useState } from "react";
import parse from "html-react-parser";
import ProductAttributes from "../components/ProductAttributes";
import ImageCarousel from "../components/ImageCarousel";

const ProductDetailsPage = () => {
    const { productId } = useParams();
    const { loading, error, data } = useQuery(GET_PRODUCT_DETAILS, {
        variables: { productId: parseInt(productId) },
    });

    const [selectedAttributes, setSelectedAttributes] = useState({});

    const allAttributesSelected = data?.product?.attributes?.length
        ? data.product.attributes.every((attr) => selectedAttributes[attr.name])
        : false;
    if (error) return `Error! ${error.message}`;

    return (
        <section>
            <div className="container">
                {loading ? (
                    "Loading..."
                ) : (
                    <>
                        <section className="py-10">
                            <div className="container">
                                <div className="flex flex-col md:flex-row gap-10 justify-between">
                                    <div className="w-full md:w-[60%] flex flex-col md:flex-row justify-between gap-5">
                                        {/* image carousel  */}
                                        <ImageCarousel gallery={data.product.gallery} />
                                    </div>
                                    <div className="w-full md:w-[40%]">
                                        {/* name  */}
                                        <h1 className="text-4xl font-raleway font-semibold mb-5">
                                            {data.product.name}
                                        </h1>
                                        {/* attributes  */}
                                        <ProductAttributes
                                            attributes={data.product.attributes}
                                            onChange={setSelectedAttributes}
                                        />
                                        {/* price  */}
                                        <div>
                                            <h3 className="text-xl font-roboto font-semibold">
                                                Price:
                                            </h3>
                                            <p className="font-raleway text-2xl font-bold mb-5">
                                                {data.product.prices[0].currency.symbol +
                                                    data.product.prices[0].amount}
                                            </p>
                                        </div>
                                        {/* add to cart btn  */}
                                        <button
                                            disabled={!allAttributesSelected}
                                            className={`px-6 py-3 rounded w-full cursor-pointer hover:bg-[#6ed388] ${
                                                allAttributesSelected
                                                    ? "bg-primary text-white"
                                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            }`}
                                        >
                                            Add to Cart
                                        </button>
                                        {/* description  */}
                                        <div className="font-roboto my-5">
                                            {parse(data.product.description)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                )}
            </div>
        </section>
    );
};

export default ProductDetailsPage;
