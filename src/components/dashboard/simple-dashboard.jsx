import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "@/axios/axiosInstance.js";

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
import { Users, Plus } from "lucide-react";
import SignUpForm from "@/components/SignUpForm.jsx";
import Sidebar from "./SideBar.jsx";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const FamilyDashboard = () => {
    const [data, setData] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [openPopover, setOpenPopover] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const authentication = useSelector((state) => state.authentication);

    useEffect(() => {
        const fetchGroupDetails = async () => {
            try {
                const response = await axiosInstance.get(
                    `/authentication/familyGroup/${authentication?.memberLoginId}`
                );
                setData(response?.data);
            } catch (error) {
                console.error("Error fetching family group details", error);
            }
        };
        fetchGroupDetails();
    }, []);

    const totalCourses =
        data?.familyMember?.reduce(
            (sum, m) => sum + (m.registeredCourses?.length || 0),
            0
        ) || 0;

    const totalCost =
        data?.familyMember?.reduce((sum, m) => {
            return (
                sum +
                (m.registeredCourses?.reduce((s, r) => s + (r.cost || 0), 0) || 0)
            );
        }, 0) || 0;

    return (
        <div className="flex">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="p-6 flex-1 space-y-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Family Dashboard</h2>
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

                {/* Family Group Card */}
                <Card>
                    <CardContent className="p-4">
                        <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
                            <Users size={20} /> Family Group - {data?.familyGroupId}
                        </h2>
                        <div className="flex gap-6 text-sm sm:text-base">
                            <div>
                                <strong>Total Courses:</strong> {totalCourses}
                            </div>
                            <div>
                                <strong>Total Cost:</strong> ${totalCost.toFixed(2)}
                            </div>
                        </div>
                    </CardContent>
                </Card>



                {/* Family Members Table */}
                <Card>
                    <CardContent className="p-4">
                        <h3 className="text-lg font-semibold mb-4">Family Members</h3>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>City</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Preferred Contact</TableHead>
                                    <TableHead># Courses</TableHead>
                                    <TableHead>Total Cost</TableHead>
                                    <TableHead>Active Courses</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data?.familyMember?.map((member) => {
                                    const registeredCourses = member.registeredCourses || [];
                                    const totalCost = registeredCourses.reduce(
                                        (sum, reg) => sum + (reg.cost || 0),
                                        0
                                    );
                                    const activeCourses = registeredCourses.filter(
                                        (c) => !c.isWithdraw
                                    );
                                    return (
                                        <TableRow key={member.familyMemberId}>
                                            <TableCell>{member.name}</TableCell>
                                            <TableCell>{member.city || "N/A"}</TableCell>
                                            <TableCell>{member.homePhone || "N/A"}</TableCell>
                                            <TableCell>{member.preferredContact || "N/A"}</TableCell>
                                            <TableCell>{registeredCourses.length}</TableCell>
                                            <TableCell>${totalCost.toFixed(2)}</TableCell>
                                            <TableCell>{activeCourses.length}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default FamilyDashboard;
