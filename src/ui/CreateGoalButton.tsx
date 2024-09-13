import { Plus } from 'lucide-react';

interface ButtonProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Button: React.FC<ButtonProps> = ({ setOpen }) => {
    return (
        <button type='button' onClick={() => { setOpen(true) }} className='bg-violet-500 text-violet-50 px-4 py-2.5 rounded-lg flex items-center gap-2'>
            <Plus className='size-4' />
            Cadastrar meta
        </button>
    );
}

export default Button;