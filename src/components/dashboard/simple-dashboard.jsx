import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Plus } from "lucide-react";
import axiosInstance from "@/axios/axiosInstance.js";
import { useSelector } from "react-redux";
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

const FamilyDashboard = () => {
    const [data, setData] = useState({});
    const [openPopover, setOpenPopover] = useState(false);
    const [courseRegistrations, setCourseRegistrations] = useState([]);
    const authentication = useSelector((state) => state.authentication);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await axiosInstance.get(`/authentication/familyGroup/${authentication?.memberLoginId}`);
                setData(res.data);

                const courseRes = await axiosInstance.get(
                    `/courseRegistrations/enrollment/${authentication?.memberLoginId}`
                );
                setCourseRegistrations(courseRes.data || []);

            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        fetchDetails();
    }, []);

    const totalCourses = courseRegistrations.length;
    const totalCost = courseRegistrations.reduce(
        (sum, reg) => sum + (reg.cost || 0),
        0
    );

    // Construct bar chart data: { name: memberName, courseCount: x, totalCost: y }
    const chartData = data?.familyMember?.map((member) => {
        const totalCourses = member?.courseRegistrations?.length || 0;
        const totalCost = member?.courseRegistrations?.reduce((sum, reg) => sum + (reg.cost || 0), 0);
        return {
            name: member.name || "Unknown",
            courses: totalCourses,
            cost: totalCost
        };
    }) || [];

    return (
        <div className="flex">
            <div className="p-6 flex-1">
                <div className="flex justify-between items-center mb-4">
                    <Dialog open={openPopover} onOpenChange={setOpenPopover}>
                        <DialogTrigger asChild>
                            <Button className="flex items-center gap-2">
                                <Plus size={16} /> Add Family Member
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle>Add New Member</DialogTitle>
                            </DialogHeader>
                            <SignUpForm isSignUp={false} onSuccess={() => setOpenPopover(false)} />
                        </DialogContent>
                    </Dialog>
                </div>

                <Card>
                    <CardContent className="p-4 flex flex-col md:flex-row justify-between items-center">
                        <div className="text-lg font-medium">
                            <Users className="inline mr-2" size={20} /> Family Group - {data.familyGroupId}
                        </div>
                        <div className="flex gap-6 mt-2 md:mt-0">
                            <div>Total Courses: {totalCourses}</div>
                            <div>Total Cost: ${totalCost?.toFixed(2)}</div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="mt-6">
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
