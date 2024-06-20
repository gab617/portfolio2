
export function Header() {
    return (
        <header className='
        sticky top-0 
        bg-black 
        p-1 
        bg-opacity-80 z-50
        sm:text-xl 
        xl:m-auto 
        '>
            <nav className='flex justify-between items-center xl:w-90 xl:m-auto'>
                <div className='ml-2 mt-2 w-1/6 sm:w-15 md:w-10 xl:w-16'>
                    <img className='rounded-full' src="logo.webp" alt="" />
                </div>
                <ul className='flex justify-between gap-5 mr-2 ul-header'>
                    <li>
                        <a href="#">Sobre mí</a>
                    </li>
                    <li>
                        <a href="#proyectos">Proyectos</a>
                    </li>
                    <li>
                        <a href="#contacto">Contacto</a>
                    </li>
                </ul>
            </nav>

        </header>
    )
}
