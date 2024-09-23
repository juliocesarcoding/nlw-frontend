import React, { useState } from "react";
import CreateGoalButton from "../ui/CreateGoalButton";
import CreateGoalDrawer from "./CreateGoalDrawer";
import { getDayOfTheMonth, getHourAndMinutes } from "../utils/getHourCompleted";
import { getDayOfWeek } from "../utils/getDayOfweek";
import Toast from "../ui/Toast";


// interface Goal {
//     id: string;
//     title: string;
//     completedAt: string; // assuming this is a date string in ISO format
// }

// interface GoalsPerDay {
//     [date: string]: Goal[];
// }

// interface Progress {
//     completed: number;
//     total: number;
//     goalsPerDay: GoalsPerDay;
// }
// interface SummaryProps {
//     goals: Progress;
// }

export const Summary: React.FC<any> = ({ goals, pendingGoals }: any) => {


    const [isShowToast, setIsShowToast] = useState(false);

    const handleSetCompletedGoal = async (goalId: string) => {
        const body = {
            goalId: goalId
        }
        try {
            console.log(JSON.stringify({
                goalId: goalId
            }
            ));
            const url = "http://localhost:3333/completions";
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            })
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            setIsShowToast(true);

            const json = await response.json();
            return json

        } catch (error) {
            throw new Error(`Catch error: ${error}`);

        }
    }

    // goals = {
    //     "completed": 2,
    //     "total": 13,
    //     "goalsPerDay": {
    //         "2024-09-23": [
    //             {
    //                 "id": "m21o9rmhk64jlbwj9pjs3i3p",
    //                 "title": "Learn to code",
    //                 "completedAt": "2024-09-23T16:16:16.091071+00:00"
    //             },
    //             {
    //                 "id": "f1blkts8c9iwf8v3z7yxfhyd",
    //                 "title": "Exercise",
    //                 "completedAt": "2024-09-23T17:21:01.07632+00:00"
    //             }
    //         ]
    //     }
    // }

    // pendingGoals = {
    //     "pendingGoals": [
    //         {
    //             "id": "nyy65e73qzqa3nj4xf6n5t5g",
    //             "title": "Learn to code",
    //             "desiredWeeklyFrequency": 2,
    //             "completionCount": 1
    //         },
    //         {
    //             "id": "d1dhh0ihmdqtav6do8vbkh0u",
    //             "title": "Exercise",
    //             "desiredWeeklyFrequency": 3,
    //             "completionCount": 0
    //         },
    //         {
    //             "id": "is7we5ej912oa9pwua8za7m3",
    //             "title": "Read",
    //             "desiredWeeklyFrequency": 1,
    //             "completionCount": 0
    //         },
    //         {
    //             "id": "byjshxqsxfzvtp31qhd6653w",
    //             "title": "Passar alcool em gel",
    //             "desiredWeeklyFrequency": 1,
    //             "completionCount": 0
    //         },
    //         {
    //             "id": "d5j8sthoi0r2gvhxfhcut0gx",
    //             "title": "Nao usar celular",
    //             "desiredWeeklyFrequency": 3,
    //             "completionCount": 0
    //         },
    //         {
    //             "id": "cflk3t37x09afod996s7xxo5",
    //             "title": "Nao usar celular",
    //             "desiredWeeklyFrequency": 3,
    //             "completionCount": 0
    //         }
    //     ]
    // }

    const [open, setOpen] = React.useState(false)
    console.log(goals);

    return (
        <div className='flex h-screen p-10 justify-center '>
            <div className=" absolute flex flex-col items-center gap-4 ">
                <div className="flex flex-row  gap-4 align-baseline items-baseline mt-4">
                    <img src='./icon.svg' alt='logo' className='h-10 w-10' />
                    <h1 className='text-3xl font-bold leading-none'>05 a 12 de Agosto</h1>
                    <CreateGoalButton setOpen={setOpen} />
                </div>
                <div className="relative ">
                    <h4 className="sr-only">Status</h4>
                    <div aria-hidden="true" className="mt-6">
                        <div className="overflow-hidden rounded-full bg-gray-200">
                            <div style={{ width: `${Math.round((goals.completed / goals.total) * 100)}%` }} className="h-2 rounded-full bg-indigo-600" />
                        </div>
                        <div className="justify-between flex flex-row gap-6">
                            <p className="mt-2 text-sm font-medium text-white">Você completou {goals.completed} de {goals.total} metas nessa semana.</p>
                            <p className="mt-2 text-sm font-medium text-zinc-500"> {Math.round((goals.completed / goals.total) * 100)}%</p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2 ">
                    {pendingGoals.pendingGoals.map((goal: any, index: any) => (
                        <div key={index}>
                            <button onClickCapture={async () => { await handleSetCompletedGoal(goal.id) }} type="button" className=" animation-spin border-dashed border-white border rounded-lg p-2">+ {goal.title}</button>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-3x1 font-bold">Sua semana </h1>
                    {goals.goalsPerDay === null ? (
                        <p className="text-zinc-500">
                            Você ainda não completou nenhuma meta esta semana.
                        </p>
                    ) : (
                        Object.keys(goals.goalsPerDay).map((date, index) => (
                            <div key={index}>
                                <strong>{getDayOfWeek(date)} <span className="text-zinc-500 text-[10px]">{getDayOfTheMonth(date)}</span></strong>
                                <ul>
                                    {goals.goalsPerDay[date].map(
                                        (goal: any, goalIndex: any) => (
                                            <div className="flex gap-3" key={goalIndex}>
                                                <img src="./circle-check.svg" alt="check" />
                                                <li className="text-zinc-500 space">
                                                    {' '}
                                                    Você completou{' '}
                                                    <span className="text-white">
                                                        "{goal.title}"
                                                    </span>{' '}
                                                    esta semana às{' '}
                                                    <span className="text-white">
                                                        {getHourAndMinutes(goal.completedAt)}h
                                                    </span>
                                                </li>
                                            </div>
                                        )
                                    )}
                                </ul>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <CreateGoalDrawer open={open} setOpen={setOpen} />
            <Toast show={isShowToast} setShow={setIsShowToast} />
        </div>


    );
};

export default Summary;