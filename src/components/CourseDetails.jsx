import { useEffect, useState } from "react";
import { useLocation } from "react-router";

const CourseDetails = () => {
    const location = useLocation();
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState("");

    useEffect(() => {
        if (location.state?.product) {
            setProduct(location.state.product);
            setMainImage(location.state.product.images?.[0]?.url || "fallback.jpg");
        }
    }, [location]);


    if (!product) {
        return <p>Loading product details...</p>;
    }

    console.log(product)
    console.log(mainImage)

    return (
        <div className="bg-gray-100">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-wrap -mx-4">

                    {/* Product Images */}
                    <div className="w-full md:w-1/2 px-4 mb-8">
                        <img
                            src={`/${mainImage}`}
                            alt="Product"
                            className="w-full h-auto rounded-lg shadow-md mb-4"
                        />
                        <div className="flex gap-4 py-4 justify-center overflow-x-auto">
                            {product.images?.map((image, index) => (
                                <img
                                    key={index}
                                    src={`/${image.url}`}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                                    onClick={() => setMainImage(image.url)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="w-full md:w-1/2 px-4">
                        <h2 className="text-3xl font-bold mb-2">{product.name || "No Name Available"}</h2>
                        <p className="text-gray-600 mb-4">SKU: {product.sku || "N/A"}</p>

                        <div className="mb-4">
                            <span className="text-2xl font-bold mr-2">${product.price || "0.00"}</span>
                            {product.originalPrice && (
                                <span className="text-gray-500 line-through">
                                    ${product.originalPrice}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center mb-4">
                            {[...Array(5)].map((_, index) => (
                                <svg
                                    key={index}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className={`size-6 ${index < (product.rating || 0) ? "text-yellow-500" : "text-gray-300"}`}
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ))}
                            <span className="ml-2 text-gray-600">
                                {product.rating || "0"} ({product.reviews || "0"} reviews)
                            </span>
                        </div>

                        <p className="text-gray-700 mb-6">{product.description || "No description available."}</p>

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Color:</h3>
                            <div className="flex space-x-2">
                                {product.colors?.length > 0 ? (
                                    product.colors.map((color, index) => (
                                        <button
                                            key={index}
                                            className="w-8 h-8 rounded-full focus:outline-none"
                                            style={{ backgroundColor: color }}
                                        ></button>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No colors available</p>
                                )}
                            </div>
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="quantity"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Quantity:
                            </label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                min="1"
                                defaultValue="1"
                                className="w-12 text-center border border-gray-300 rounded-md"
                            />
                        </div>

                        <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
