import React, { useState, useEffect } from "react";
import { FaSearch, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";
import axiosInstance from "../axios/axiosInstance.js";

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredCourses, setFilteredCourses] = useState([]);

    useEffect(() => {
        const fetchOfferedCourses = async () => {
            try {
                const  response = await axiosInstance.get("/offeredCourses");
                const data = response?.data;

                setCourses(data);
                setFilteredCourses(data);
            }catch (error){
                console.log("error", error)
            }
        }
        fetchOfferedCourses();
    }, []);


    useEffect(() => {
        // Filter courses based on search
        setFilteredCourses(
            courses.filter((course) =>
                course.course.name.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, courses]);


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

    return (
        <div className="px-8 py-6">
            {/* Search Bar */}
            <div className="flex items-center mb-6">
                <input
                    type="text"
                    placeholder="Search courses..."
                    className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <FaSearch className="ml-2 text-gray-500 size-5" />
            </div>

            {/* Course Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {filteredCourses.map((course, index) => (
                    <div
                        key={index}
                        className="p-4 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        {/* Dynamically load image based on course name */}
                        <img
                            src={getImageUrl(course.course.name)}
                            alt={course.course.name}
                            className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                        <h5 className="text-xl font-semibold text-gray-900 mb-2">{course.course.name}</h5>
                        <p className="text-gray-700 mb-4">{course.course.description}</p>
                        <Link
                            to={`/course/details/${course.course.courseId}`}
                            state={{ product: course }}
                            className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
                        >
                            See More <FaArrowRight className="ml-2" />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseList;
