import { Plus } from 'lucide-react'
import logo from './assets/logo-in-orbit.svg'
import letsStart from './assets/lets-start.svg'

export function App() {

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8" >
      <img src={logo} alt='in-orbit' />
      <img src={letsStart} alt='lets-start' />
      <p className='text-zinc-300 leading-relaxed max-w-80 text-center'> Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora mesmo?</p>
      <button type='button' className='px-4 w-340 h-52 '> <Plus className='w-16 h-16' /> Cadastrar meta</button>

    </div>
  )
}

export default App
