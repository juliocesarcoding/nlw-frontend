'use client'

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react';

export default function CreateGoalDrawer({ setOpen, open }: any) {

    const [checkedState, setCheckedState] = useState(Array(7).fill(false));

    const handleCheckboxChange = (index: any) => {
        const updatedCheckedState = checkedState.map((item, idx) =>
            idx === index ? !item : item
        );
        setCheckedState(updatedCheckedState);
    };


    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10 ">
            <div className="fixed inset-0" />
            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <DialogPanel
                            transition
                            className="border-l-gray-500 pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
                        >
                            <div className="flex h-full flex-col  bg-zinc-900 shadow-xl">
                                <div className="flex min-h-0 flex-1 flex-col overflow-y-scroll py-6">
                                    <div className="px-4 sm:px-6">
                                        <div className="flex items-start justify-between">
                                            <DialogTitle className="text-base font-semibold leading-6 text-zinc-50">Cadastrar meta</DialogTitle>

                                            <div className="ml-3 flex h-7 items-center">
                                                <button
                                                    type="button"
                                                    onClick={() => setOpen(false)}
                                                    className="relative rounded-md bg-zinc-900 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                >
                                                    <span className="absolute -inset-2.5" />
                                                    <span className="sr-only">Close panel</span>
                                                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                        <span className='text-zinc-400 '>Adicione atividades que <u>te fazem bem</u> e que você quer continuar praticamento toda semana</span>
                                        <div>
                                            <h1 className='mt-6'>Qual atividade ?</h1>
                                            <input className=' mt-2 bg-zinc-950 p-4 rounded-[8px] w-[336px] h-[48px]' placeholder='Praticar exercícios, meditar, etc...'></input>
                                        </div>
                                        <div>
                                            <h1 className='mt-6'>Quantas vezes na semana ?</h1>
                                            {[1, 2, 3, 4, 5, 6, 7].map((num, index) => (
                                                <div key={num} className={`flex items-center mt-2  rounded-[8px]`}>
                                                    <div className="relative">
                                                        <input
                                                            id={`checkbox-${num}`}
                                                            type="checkbox"
                                                            value={num}
                                                            name="frequency-checkbox"
                                                            checked={checkedState[index]}
                                                            onChange={() => handleCheckboxChange(index)}
                                                            className={`rounded-full absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-600 bg-gray-100  border-gray-300 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`}
                                                        />
                                                        <label htmlFor={`checkbox-${num}`} className={`ml-2 text-zinc-400 ${checkedState[index] ? 'ring-2 ring-pink-500' : ''} bg-zinc-950 p-4 rounded-[8px] w-[336px] h-[48px] flex items-center justify-center pl-10`}>
                                                            {`${num === 7 ? "Todos os dias da semana" : `${num}x na semana`} 😊`}
                                                        </label>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className=" flex flex-row  justify-end px-4 py-4">
                                    <button
                                        type="button"
                                        onClick={() => setOpen(false)}
                                        className=" w-full rounded-md bg-zinc-700 px-3 py-2 text-sm font-semibold text-zinc-400 shadow-sm    "
                                    >
                                        Fechar
                                    </button>
                                    <button
                                        type="submit"
                                        className="w-full ml-4 inline-flex justify-center rounded-md bg-violet-500 px-3 py-2 text-sm font-semibold text-violet-50 shadow-sm "
                                    >
                                        Salvar
                                    </button>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}
