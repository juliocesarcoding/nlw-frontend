import React, { useState } from "react";
import CreateGoalButton from "../ui/CreateGoalButton";
import CreateGoalDrawer from "./CreateGoalDrawer";
import { getDayOfInNumber, getDayOfTheMonth, getHourAndMinutes, getMonth } from "../utils/getHourCompleted";
import { getDayOfWeek } from "../utils/getDayOfweek";
import Toast from "../ui/Toast";



export const Summary: React.FC<any> = ({ goals, pendingGoals }: any) => {


    const [isShowToast, setIsShowToast] = useState(false);
    const firstDay = new Date(Object.keys(goals.goalsPerDay)[0]).getDate();
    const lastDay = new Date(Object.keys(goals.goalsPerDay)[Object.keys(goals.goalsPerDay).length - 1]).getDate();

    console.log(lastDay);
    // const lastDay = Object.keys(goals.goalsPerDay)[0];
    // console.log(lastDay);chrome

    const handleSetCompletedGoal = (goalId: string) => {
        const body = {
            goalId: goalId
        }

        fetch("http://localhost:3333/completions", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                return response.json();
            })
            .then(json => {
                setIsShowToast(true);
                setTimeout(() => {
                    window.location.reload();
                }, 100); // delay reload by 100mse
                return json;
            })
            .catch(error => {
                throw new Error(`Catch error: ${error}`);
            });
    }

    const [open, setOpen] = React.useState(false)
    console.log(goals);

    return (
        <div className='flex h-screen p-10 justify-center '>
            <div className=" absolute flex flex-col items-center gap-4 ">
                <div className="flex flex-row  gap-4 align-baseline items-baseline mt-4">
                    <img src='./icon.svg' alt='logo' className='h-10 w-10' />
                    <h1 className='text-3xl font-bold leading-none'> {lastDay}  à {firstDay} de {getMonth(Object.keys(goals.goalsPerDay)[0])}</h1>
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