import React, {useEffect, useState} from "react";
import {Card, CardContent} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {User, Users, Plus, Home, Settings, Menu, ChevronDown} from "lucide-react";
import axiosInstance from "@/axios/axiosInstance.js";
import {useSelector} from "react-redux";
import {Link} from "react-router";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.jsx";
import {AddMemberModal} from "@/components/addMemberModal.jsx";
import SignUpForm from "@/components/SignUpForm.jsx";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const Sidebar = ({isOpen, toggleSidebar}) => {
    const [showFamilyDropdown, setShowFamilyDropdown] = useState(false);

    return (
        <div
            className={`h-screen bg-gray-800 text-gray-200 transition-all duration-300 mt-[-18px] ml-[-25px] ${isOpen ? "w-56" : "w-16"}`}>
            {/* Hamburger Menu */}
            <div className="p-4 flex items-center justify-between">
                {isOpen && <h3 className="text-lg font-semibold">Dashboard</h3>}
                <button onClick={toggleSidebar} className="focus:outline-none">
                    <Menu size={24}/>
                </button>
            </div>

            {/* Navigation */}
            <nav className="mt-4 space-y-2">
                <div className="p-2 flex items-center gap-3 cursor-pointer hover:bg-blue-300 rounded">
                    <Home size={24}/> {isOpen && <span className="text-sm">Home</span>}
                </div>

                {/* Family Dropdown */}
                <div>
                    <div className="p-2 flex items-center gap-3 cursor-pointer hover:bg-blue-300 rounded"
                         onClick={() => setShowFamilyDropdown(!showFamilyDropdown)}>
                        <Users size={24}/> {isOpen && <span className="text-sm">Family</span>}
                        {isOpen && <ChevronDown size={18}
                                                className={`transition-transform ${showFamilyDropdown ? "rotate-180" : "rotate-0"}`}/>}
                    </div>
                    {showFamilyDropdown && isOpen && (
                        <div className="pl-8 space-y-1">
                            <div className="p-2 cursor-pointer hover:bg-blue-300 rounded text-sm">Family Members</div>
                        </div>
                    )}
                </div>

                <div className="p-2 flex items-center gap-3 cursor-pointer hover:bg-blue-300 rounded">
                    <Settings size={24}/> {isOpen && <span className="text-sm">Settings</span>}
                </div>
            </nav>
        </div>
    );
};

const FamilyDashboard = () => {
    const [data, setData] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [openPopover, setOpenPopover] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const authentication = useSelector(state => state.authentication);

    useEffect(() => {
        const fetchGroupDetails = async () => {
            try {
                const response = await axiosInstance.get(`/authentication/familyGroup/${authentication?.memberLoginId}`);
                const data = response?.data;
                setData(data)
            } catch (error) {
                console.log("error", error)
            }
        }
        fetchGroupDetails();
    }, []);

    console.log("Data", data)

    // const isOwner = data?.isGroupOwner;

    return (
        <div className="flex">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
            <div className="p-6 flex-1">
                <h2 className="text-xl font-semibold">Family Dashboard</h2>
                <Card>
                    <CardContent className="p-4">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <Users size={20}/> Family Group - {data.familyGroupId}
                        </h2>
                    </CardContent>
                </Card>

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
                        <SignUpForm isSignUp={false} onSuccess={() => setOpenPopover(false)}/>
                    </DialogContent>
                </Dialog>

                <Card>
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
                                {data?.familyMember
                                    ?.map(member => (
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
