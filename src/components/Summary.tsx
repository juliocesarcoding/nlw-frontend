import React from "react";
import CreateGoalButton from "../ui/CreateGoalButton";
import CreateGoalDrawer from "./CreateGoalDrawer";

interface SummaryProps {
    goals: string[];
}

export const Summary: React.FC<SummaryProps> = () => {
    const [open, setOpen] = React.useState(false)

    return (
        <div className='flex h-screen p-10 justify-center '>
            <div className="flex items-center gap-4 h-14 ">
                <img src='./icon.svg' alt='logo' className='h-10 w-10' />
                <h1 className='text-4xl font-bold leading-none'>05 a 12 de Agosto</h1>
                <CreateGoalButton setOpen={setOpen} />
            </div>
            <CreateGoalDrawer open={open} setOpen={setOpen} />
        </div>


    );
};

export default Summary;