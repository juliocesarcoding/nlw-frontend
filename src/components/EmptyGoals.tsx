'use client'

import { Plus } from 'lucide-react'
import logo from '../assets/logo-in-orbit.svg'
import letsStart from '../assets/lets-start.svg'
import CreateGoalDrawer from "../components/CreateGoalDrawer";
import React from 'react';

export function EmptyGoals() {

    const [open, setOpen] = React.useState(false)
    return (
        <div className={`h-screen flex flex-col items-center justify-center gap-8 ${open ? "blur-sm" : "blur-none"}`}  >
            <img src={logo} alt='in-orbit' />
            <img src={letsStart} alt='lets-start' />
            <p className='text-zinc-300 leading-relaxed max-w-80 text-center'> Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora mesmo?</p>
            <button type='button' onClick={() => { setOpen(true) }} className='bg-violet-500 text-violet-50 px-4 py-2.5 rounded-lg flex items-center gap-2'>
                <Plus className='size-4' />
                Cadastrar meta
            </button>
            <CreateGoalDrawer open={open} setOpen={setOpen} />
        </div>
    )

}