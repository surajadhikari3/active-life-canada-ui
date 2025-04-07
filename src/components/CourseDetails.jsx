import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import {FaCartArrowDown} from "react-icons/fa";
import {useDispatch} from "react-redux";
import {addItemToCart} from "@/redux/cartSlice.jsx";

const CourseDetails = () => {
    const location = useLocation();
    const [course, setCourse] = useState(null);
    const [mainImage, setMainImage] = useState("");
    const [copied, setCopied] = useState(false);
    const [selectedFeeType, setSelectedFeeType] = useState("");
    const dispatch = useDispatch();


    useEffect(() => {
        if (location.state?.course) {
            setCourse(location.state.course);
            setMainImage(location.state.course.images?.[0]?.url || "fallback.jpg");
        }
    }, [location]);

    if (!course) {
        return <p>Loading course details...</p>;
    }

    const courseStatus = !course?.availableForEnrollment ? "Closed" : "Available";


    const handleCopy = () => {
        navigator.clipboard.writeText(course.barCode || "").then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 sec
        });
    };

    const addToCart = () => {
            dispatch(addItemToCart(course))
    }

    const getImageUrl = (courseName) => {
        const imageMapping = {
            Swimming: "swim-image.jpg", // Example, map the course name to image
            Skating: "skate-image.jpg",
            Tennis: "tennis-image.jpeg",
            Basketball: "basketball-image.jpg",
            Football: "football-image.jpg"
        };
        return `/category/${imageMapping[courseName] || "default-image.jpg"}`;
    };

    console.log("cour", course);


    return (
        <div className="bg-gray-100 mt-10">


            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-wrap -mx-4">
                    {/* Course Images */}
                    <div className="w-full md:w-1/2 px-4 mb-8">
                        <img
                            // src={`/${mainImage}`}
                            src={getImageUrl(course?.courseName)}
                            alt="Course"
                            className="w-full h-auto rounded-lg shadow-md mb-4"
                        />
                    {/*Todo: For adding the muliple image in details page*/}
                       {/* This is to display the multiple image option*/}
                        {/*<div className="flex gap-4 py-4 justify-center overflow-x-auto">*/}
                        {/*    {course.images?.map((image, index) => (*/}
                        {/*        <img*/}
                        {/*            key={index}*/}
                        {/*            src={`/${image.url}`}*/}
                        {/*            alt={`Thumbnail ${index + 1}`}*/}
                        {/*            className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"*/}
                        {/*            onClick={() => setMainImage(image.url)}*/}
                        {/*        />*/}
                        {/*    ))}*/}
                        {/*</div>*/}
                    </div>


                    {/* Course Details */}
                    <div className="w-full md:w-1/2 px-4">
                        <h2 className="text-3xl font-bold mb-2">{course?.courseName || "No Name Available"} </h2>
                        <div className="flex items-center space-x-2">

                <span
                    className="text-gray-500 cursor-pointer hover:text-gray-700 transition"
                    onClick={handleCopy}
                >
                    {course.barCode || "No Available Barcode"}
                </span>

                            {/* Copy Success Message */}
                            {copied && <span className="text-green-500 text-sm">Copied!</span>}
                        </div>


                        <p className="text-gray-600 mb-4">Course ID: {course?.courseId || "N/A"}</p>

                        {/* Status Tag */}
                        <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold text-white mb-4 ${!course?.availableForEnrollment ? "bg-red-600" : "bg-green-600"}`}>
                            {courseStatus}
                        </span>

                        {/* Start & End Date */}
                        <p className="text-gray-700 mb-2"><strong>Start Date:</strong> {course.startDate || "N/A"}</p>
                        <p className="text-gray-700 mb-2"><strong>End Date:</strong> {course.endDate || "N/A"}</p>

                        {/* Description */}
                        <p className="text-gray-700 mb-6">{course?.courseDescription || "No description available."}</p>

                        {/* Fee Type */}
                        <label className="block text-lg font-semibold mb-2">Select Fee Type:</label>
                        <select
                            className="w-full p-2 border-4 border-gray-500 rounded-md focus:ring-2 focus:ring-blue-500 mb-4"
                            value={selectedFeeType}
                            onChange={(e) => setSelectedFeeType(e.target.value)}
                        >
                            <option value="" disabled>Select a Fee Type</option>
                            {course?.offeredCourseFeeDto?.map((offeredCourse) => (
                                <option key={offeredCourse.feeType} value={offeredCourse.feeType}>
                                    {offeredCourse.feeType} - ${offeredCourse.courseFee}
                                </option>
                            ))}
                        </select>

                        {selectedFeeType && (
                            <div className="p-4 bg-gray-100 rounded-lg">
                                <p className="text-gray-800 font-medium">Selected Fee Type: <span
                                    className="text-blue-600">{selectedFeeType}</span></p>
                            </div>
                        )}

                        <button onClick={() => addToCart()}
                            className="flex items-center justify-center text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-6 py-3 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 me-2 mb-2">
                            <FaCartArrowDown className="mr-2" /> Add to Cart
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
