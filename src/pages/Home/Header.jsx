import { Link } from "react-router-dom";
import { ThemeSelector } from "../../components/ThemeSelector";

export function Header() {
    return (
        <header className='
        
        sticky top-0 
        bg-black 
        sm:p-1 
        text-sm
        bg-opacity-10 z-50
        sm:text-xl 
        xl:m-auto 
        '>
            <nav className='
            flex justify-between items-center 
            xl:w-95 xl:m-auto'>
                <div className='
                m-1
                w-1/6 
                sm:w-15 
                md:w-10 
                xl:w-16'>
                    <img className='rounded-full' src="logo.webp" alt="" />
                </div>
                <ul className='
                flex justify-between gap-5 mr-2 
                text-center
                items-center
                ul-header'>
                    <li>
                        <a href="#">Sobre mí</a>
                    </li>
                    <li>
                        <a href="#proyectos">Proyectos</a>
                    </li>
                    <li>
                        <a href="#contacto">Contacto</a>
                    </li>
                    <li>
                        <Link to='apis'>APIs</Link>
                    </li>
                    <li>
                        <ThemeSelector></ThemeSelector>
                    </li>

                </ul>

            </nav>

        </header>
    )
}
