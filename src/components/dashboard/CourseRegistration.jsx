import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axiosInstance from "@/axios/axiosInstance.js";
import {toast} from "react-toastify";
import {updateCourseRegistration} from "@/redux/authenticationSlice.jsx";

const CourseRegistrationList = () => {

    const authentication = useSelector((state) => state.authentication);
    const [courseRegistrations, setCourseRegistration] = useState();
    const dispatch = useDispatch();


    const fetchDetails = async () => {
        try {
            const res = await axiosInstance.get(`courseRegistrations/enrollment/${authentication?.memberLoginId}`);
            setCourseRegistration(res?.data);
            dispatch(updateCourseRegistration(res?.data))
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    useEffect(() => {
        fetchDetails()
    }, []);


    const handleWithdraw = async (enrollmentId) => {
        if (window.confirm("Are you sure you want to withdraw from this course?")) {
            try {
                const withDrawResponse = await axiosInstance.delete(`courseRegistrations/enrollment/withdraw/${enrollmentId}`);
                const response = await withDrawResponse?.data;
                if (withDrawResponse.status === 200) {
                    fetchDetails()

                    toast.success( 'Withdrawn From Course SuccessFully')
                } else{
                    toast.error( "Can not Drop course", {position: "top-right", autoClose: 1000});
                    throw new Error(response.message || `Server Error: ${response.status}`);
                }
            } catch (error) {
                toast.error(error.message || "Can not Drop course", {position: "top-right", autoClose: 1000});
            }
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Registered Courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courseRegistrations?.map((course) => (
                    <div
                        key={course.familyCourseRegistrationId}
                        className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300"
                    >
                        <h3 className="text-xl font-semibold text-blue-700 mb-2">
                            Course ID: #{course.familyCourseRegistrationId}
                        </h3>
                        <p className="text-gray-700">
                            <span className="font-medium">Cost:</span> ${course.cost}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-medium">Enrollment Date:</span>{" "}
                            {new Date(course.enrollmentDate).toLocaleDateString()}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-medium">Enrolled By:</span>{" "}
                            {course.enrollmentActor} (ID: {course.enrollmentActorId})
                        </p>
                        <p className={`mt-2 font-medium ${course.isWithdraw ? "text-red-600" : "text-green-600"}`}>
                            {course.isWithdraw ? "Withdrawn" : "Active Enrollment"}
                        </p>

                        {!course.isWithdraw && (
                            <div className={"mt-2 flex"}>
                            <button
                                onClick={() => handleWithdraw(course.familyCourseRegistrationId)}
                                className=" bg-orange-400 hover:bg-orange-600 text-white px-4 py-2 rounded-xl shadow transition duration-300"
                            >
                                Withdraw
                            </button>
                            </div>
                        )}

                        <div className="mt-4 text-sm text-gray-500">
                            Created: {new Date(course.createdTimeStamp).toLocaleString()}
                            <br />
                            Last Updated: {new Date(course.lastUpdatedTimeStamp).toLocaleString()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseRegistrationList;
