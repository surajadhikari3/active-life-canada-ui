import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {Users, BanknoteArrowUp, DollarSign, BookOpen, UserPlus} from "lucide-react";
import axiosInstance from "@/axios/axiosInstance.js";
import { useDispatch, useSelector } from "react-redux";
import SignUpForm from "@/components/SignUpForm.jsx";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import {updateCourseRegistration, updateFamilyGroup} from "@/redux/authenticationSlice.jsx";
import AddMemberForm from "@/components/AddMemberForm.jsx";

const FamilyDashboard = () => {
    const [data, setData] = useState({});
    const [openPopover, setOpenPopover] = useState(false);
    const authentication = useSelector((state) => state.authentication);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await axiosInstance.get(`/authentication/familyGroup/${authentication?.memberLoginId}`);
                setData(res.data);
                dispatch(updateFamilyGroup(res.data));
                // const courseRegistration = res?.data
                //     ?.familyMember
                //     ?.find(member => member?.familyMemberId === authentication?.memberLoginId)
                //     .courseRegistrations;
                // console.log("registration", courseRegistration)
                // dispatch(updateCourseRegistration(courseRegistration))

            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        fetchDetails();
    }, []);

    // Construct bar chart data: { name: memberName, courseCount: x, totalCost: y }
    const chartData = data?.familyMember?.map((member) => {
        const totalCourses = member?.courseRegistrations?.length || 0;
        const totalCost = member?.courseRegistrations?.reduce((sum, reg) => sum + (reg.cost || 0), 0);
        return {
            name: member.name || "Unknown",
            courses: totalCourses,
            cost: totalCost,
        };
    }) || [];

    return (
        <div className="flex">
            <div className="p-6 flex-1">
                <div className="flex justify-between items-center mb-4">
                    <Dialog open={openPopover} onOpenChange={setOpenPopover}>
                        <DialogTrigger asChild>
                            <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white shadow-md">
                                <UserPlus size={16} /> Add Family Member
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle>Add New Member</DialogTitle>
                            </DialogHeader>
                            <AddMemberForm onSuccess={() => setOpenPopover(false)} />
                        </DialogContent>
                    </Dialog>
                </div>

                <Card className="shadow-lg rounded-lg border border-gray-200">
                    <CardContent className="p-4 flex flex-col md:flex-row justify-between items-center">
                        {/*<div className="text-lg font-medium flex items-center">*/}
                        {/*    <Users className="inline mr-2 text-blue-600" size={24} />*/}
                        {/*    <span>Family Group - {data.familyGroupId}</span>*/}

                        {/*    <div className="flex items-center gap-1 text-gray-700">*/}
                        {/*        <BanknoteArrowUp size={18} strokeWidth={1.25} absoluteStrokeWidth />*/}
                        {/*        <span>Credits: ${data?.credits?.toFixed(2)}</span>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        <div className="text-lg font-medium flex flex-col gap-1 text-gray-700">
                            <div className="flex items-center gap-2">
                                <Users className="text-blue-600" size={24} />
                                <span>Family Group - {data.familyGroupId}</span>
                            </div>

                            <div className=" flex items-center gap-1">
                                <BanknoteArrowUp className="text-blue-600" size={18} strokeWidth={1.25} absoluteStrokeWidth />
                                <span>Family Credits: ${data?.credits?.toFixed(2) || 0} </span>
                            </div>
                        </div>
                        <div className="flex gap-6 mt-2 md:mt-0">
                            <div className="flex items-center gap-1 text-gray-700">
                                <BookOpen className="text-blue-600" size size={18} />
                                <span>Total Group Courses: {data?.totalCourseEnrolled}</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-700">
                                <DollarSign className="text-green-600" size size={18} />
                                <span>Total Courses Cost: ${data?.totalCostOfEnrolledCourses?.toFixed(2)}</span>
                            </div>

                        </div>
                    </CardContent>
                </Card>

                <Card className="mt-6 shadow-lg rounded-lg border border-gray-200">
                    <CardContent className="p-4">
                        <h3 className="text-lg font-semibold mb-4">Family Member Course vs Cost Distribution</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="courses" name="Courses Taken" fill="#8884d8" />
                                <Bar dataKey="cost" name="Total Cost ($)" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default FamilyDashboard;
