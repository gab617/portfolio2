/* eslint-disable react/jsx-key */
import { LoaderProject } from "./components/LoaderProject"
import { projectsF } from './assets/jsonData.json'


export function Works() {
    return (
        <section id='proyectos' className='mt-10'>
            <div>
                <h1 className='text-center mb-4 text-3xl sm:bg-black sm:bg-opacity-75 md:text-4xl'>Proyectos</h1>
            </div>
            <div>
                {
                    projectsF.map(proyect => {
                        return (
                            <div className='
                                mb-10 
                                xl:bg-black 
                                xl:bg-opacity-50 
                                xl:p-2'>
                                <div className='flex justify-between mb-2'>
                                    <div className="flex items-center">
                                        <h1 className='text-xl md:text-3xl'>{proyect.title}</h1>


                                    </div>
                                    <div className="flex">
                                        <a className="w-11 mr-5" href={proyect.url_repo} target='_blank'>
                                            <img className="
                                        img-repo
                                        rounded-full
                                        opacity-80
                                        ml-3
                                        cursor-pointer
                                        " src="icons_tecs/github-logo.png" alt="" title="repository" />
                                        </a>
                                        <LoaderProject
                                            proyectUrl={proyect.url_ping}
                                        />
                                    </div>

                                </div>


                                <article className='xl:flex xl:p-3'>

                                    <div className='
                                    flex items-center justify-center
                                    w-full 
                                    xl:w-2/3
                                    '>
                                        <a
                                            href={proyect.url_link} target='_blank'>
                                            <img className="rounded-xl" src={proyect.img_url} alt="" />
                                        </a>
                                    </div>

                                    <p className='
                                    sm:text-xl                           
                                    bg-black 
                                    bg-opacity-75 
                                    p-4 
                                    xl:rounded-xl 
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
                                            <div className='mt-2'>
                                                <img className='w-full img-tecs rounded-full' src={tec} alt="" />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })

                }
            </div>


        </section>
    )
}
