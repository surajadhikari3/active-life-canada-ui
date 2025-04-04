import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import SignUpForm from "@/components/SignUpForm.jsx";


export function AddMemberModal() {

    return (
        <PopoverContent>
            <SignUpForm/>
        </PopoverContent>

    )
}