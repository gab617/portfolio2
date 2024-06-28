/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { LoaderProject } from "../../components/LoaderProject"
import { projectsF } from '../../assets/jsonData.json'



const ListProjects = () => {
    const Proyect = ({ proyect }) => {
        return (
            <div className='
            mb-10 
            sm:rounded-xl
            xl:bg-black 
            xl:bg-opacity-10 
            xl:p-2'>
                <div className='

                flex justify-between mb-2 sm:mt-3'>
                    <div className="flex items-center">
                        <h1 className='text-xl md:text-3xl font-bold text-gray-200'>{proyect.title}</h1>
                    </div>
                    {/* LOADER */}
                    <div className="
        
                        W-full
                        flex

                    ">
                        <a className="
                        w-11 mr-5 
        "
                            href={proyect.url_repo} target='_blank'>
                            <img className="
            
                            img-repo
                            rounded-full
                            opacity-80
                            ml-3
                            cursor-pointer"
                                src="icons_tecs/github-logo.png" alt="" title="repository" />
                        </a>
                        <div className="
                        flex
                        ">
                            <LoaderProject
                                url={proyect.url_ping}
                                text={'Solicitando server'}
                            />
                        </div>

                    </div>

                </div>


                <article className='
                xl:flex xl:p-3 mt-3 mb-2'>

                    <div className='
                    drop-shad-tecno
                flex items-center justify-center
                w-full 
                xl:w-2/3
                '>
                        <a
                            className=""
                            href={proyect.url_link} target='_blank'>
                            <img className="
                            lg:border
                            lg:border-black
                            lg:transform hover:scale-105
                            lg:transition-transform 
                            lg:duration-400
                            lg:hover:border-emerald-400
                            rounded-xl" src={proyect.img_url} alt="" />
                        </a>
                    </div>

                    <p className='
                        sm:text-xl                           
                        bg-black 
                        bg-opacity-35 
                        p-4 
                        rounded-xl 
                        lg:ml-2
                        xl:w-full'>
                        {proyect.description_app}
                        <br />
                        <br />
                        {proyect.description_dev}
                    </p>
                </article>

                <div className='m-auto w-70 flex justify-center items-center gap-2 sm:w-1/2 lg:w-1/3 xl:w-1/5'>
                    {proyect.tecs.map(tec => {
                        return (
                            <div className="
                            drop-shad-tecno
                            w-full
                            ">
                                <div className='mt-2'>
                                    <img className='xl:w-80 img-tecs rounded-full' src={tec} alt="" />
                                </div>
                            </div>

                        )
                    })}
                </div>
            </div>
        )
    }

    return (
        <div>
            {
                projectsF.map(proyect => {
                    return (
                        <Proyect
                            proyect={proyect}
                        />
                    )
                })

            }
        </div>
    )
}
const Tiltle = () => {
    return (
        <div>
            <h1 className='
            text-center 
            mb-4 text-3xl 
            sm:bg-black sm:bg-opacity-15 
            sm:rounded-xl
            md:text-4xl'>Proyectos</h1>
        </div>
    )
}

export function Works() {
    return (
        <section id='proyectos' className='mt-10'>
            <Tiltle />
            <ListProjects />
        </section>
    )
}
