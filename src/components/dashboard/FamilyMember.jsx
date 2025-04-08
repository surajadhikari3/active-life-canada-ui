import {Card, CardContent} from "@/components/ui/card.jsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Pencil, Trash2} from "lucide-react";
import React from "react";

const FamilyMember =({data}) => {

    return (
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
                            <TableHead className="text-center">Actions</TableHead>
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
                                <TableCell>
                                    <div className="flex gap-2 justify-center">
                                        <Button size="sm" variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">
                                            <Trash2 size={16} className="mr-1" /> Delete
                                        </Button>
                                        <Button size="sm" variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
                                            <Pencil size={16} className="mr-1" /> Edit
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </CardContent>
        </Card>
    )

}

export default FamilyMember;