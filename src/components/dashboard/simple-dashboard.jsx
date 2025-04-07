import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    Users,
    Plus,
} from "lucide-react";
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
import Sidebar from "./SideBar.jsx";
import {
    PieChart,
    Pie,
    Tooltip,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
} from "recharts";

const COLORS = ["#4CAF50", "#2196F3", "#FF9800", "#9C27B0", "#F44336", "#00BCD4"];

const FamilyDashboard = () => {
    const [data, setData] = useState({});
    const [courseRegistrations, setCourseRegistrations] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [openPopover, setOpenPopover] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const authentication = useSelector((state) => state.authentication);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await axiosInstance.get(
                    `/authentication/familyGroup/${authentication?.memberLoginId}`
                );
                setData(res.data);

                const courseRes = await axiosInstance.get(
                    `/courses/registrations/${authentication?.memberLoginId}`
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

    const courseCountPerMember = {};
    const costPerMember = {};

    courseRegistrations.forEach((reg) => {
        const name = reg.familyMember?.name || "Unknown";
        courseCountPerMember[name] = (courseCountPerMember[name] || 0) + 1;
        costPerMember[name] = (costPerMember[name] || 0) + (reg.cost || 0);
    });

    const courseData = Object.entries(courseCountPerMember).map(
        ([name, value]) => ({ name, value })
    );
    const costData = Object.entries(costPerMember).map(([name, value]) => ({
        name,
        value,
    }));

    return (
        <div className="flex">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="p-6 flex-1">
                <div className="flex justify-between items-center mb-4">
                    {/*<h2 className="text-xl font-semibold">Family Dashboard</h2>*/}
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
                            <div>Total Cost: ${totalCost.toFixed(2)}</div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <Card>
                        <CardContent className="p-4">
                            <h3 className="text-lg font-semibold mb-2">Course Distribution</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie data={courseData} dataKey="value" nameKey="name" outerRadius={80} label>
                                        {courseData.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <h3 className="text-lg font-semibold mb-2">Cost Contribution</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={costData}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="value">
                                        {costData.map((_, index) => (
                                            <Cell key={`cell-bar-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                <Card className="mt-6">
                    <CardContent className="p-4">
                        <h3 className="text-lg font-semibold mb-4">Family Members</h3>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>City</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Preferred Contact</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data?.familyMember?.map((member) => (
                                    <TableRow key={member.familyMemberId}>
                                        <TableCell>{member.familyMemberId}</TableCell>
                                        <TableCell>{member.name}</TableCell>
                                        <TableCell>{member.city || "N/A"}</TableCell>
                                        <TableCell>{member.homePhone || "N/A"}</TableCell>
                                        <TableCell>{member.preferredContact || "N/A"}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default FamilyDashboard;
