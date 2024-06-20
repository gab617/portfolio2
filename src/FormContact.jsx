import { LoaderProject } from './components/LoaderProject'
import { InputContact } from './components/InputContact'
import { TextAreaContact } from './components/TextAreaContact'
import { ButtonCircles } from './components/ButtonCircles'
import { useState } from 'react';



// eslint-disable-next-line react/prop-types
export function FormContact({ urlPing }) {
    const initialFormValues = {
        name: '',
        email: '',
        reason: '',
        message: '',
    }

    const handleReset = (messag = '') => {
        if (messag.length > 0) {
            initialFormValues.message = messag
        }
        setFormValues(initialFormValues)
    }

    const [formValues, setFormValues] = useState(initialFormValues);
    const [loadingEmail, setLoadingEmail] = useState(false)
    const [emailEnviado, setEmailEnviado] = useState(false)
    const [cantidadMails, setCantidadMails] = useState(0)

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (cantidadMails == 2) {
            console.log('Mails permitidos ya enviados (2)')
            handleReset('YA ENVIO LOS MAILS PERMITIDOS.')
            return
        }
        console.log('Form values:', formValues);
        sendEmail()
    };

    function sendEmail() {
        setLoadingEmail(true)
        const formData = {
            name: formValues.name,
            addresse: formValues.email,
            subject: formValues.reason,
            message: formValues.message
        };
        try {
            fetch('https://portf-617-express.onrender.com/enviar-correo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then((response) => response.text())
                .then((data) => {
                    console.log(data); // Muestra la respuesta del servidor (éxito o error)
                    setTimeout(() => {
                        setLoadingEmail(false)
                        handleReset()
                        let nwCantidad = cantidadMails + 1
                        setCantidadMails(nwCantidad)
                        console.log('mails enviados en esta sesion: ', nwCantidad)

                    }, 200);
                })
                .then(() => {
                    setEmailEnviado(true)
                    setTimeout(() => {
                        setEmailEnviado(false)
                    }, 4000);
                })
                .catch((error) => {
                    console.error(error);
                });


        } catch {
            console.error('Error en try, error')
        }
    }




    return (
        <section id='contacto' 
        className='
        mb-4
        bg-white 
        bg-opacity-40 
        rounded-md p-2 
        xl:w-80 xl:m-auto 
        xl:bg-opacity-40'>

            <h1 className='text-center mb-4 text-3xl bg-black bg-opacity-75'>Contacto</h1>
            {(
                <div className='w-full flex justify-center'>
                    <LoaderProject
                        proyectUrl={urlPing}
                    ></LoaderProject>
                </div>
            )}

            <form action="" onSubmit={handleSubmit}>
                <div className='flex flex-col sm:flex-row'>
                    <div className='sm:w-60 sm:ml-8 xl:w-90'>
                        <InputContact
                            labelCont={'Nombre'}
                            nameCont={'name'}
                            handleChange={handleChange}
                            value={formValues.name}
                        />
                        <InputContact
                            labelCont={'Asunto'}
                            nameCont={'reason'}
                            handleChange={handleChange}
                            value={formValues.reason}

                        />
                        <InputContact
                            labelCont={'E-mail'}
                            nameCont={'email'}
                            handleChange={handleChange}
                            value={formValues.email}

                        />

                        <TextAreaContact
                            handleChange={handleChange}
                            value={formValues.message}


                        />
                    </div>
                    <div className='w-80 flex text-center flex-col m-auto'>
                        <h1 className='w-full text-2xl'>Enlaces</h1>
                        <div className='flex w-full justify-center gap-2'>
                            <a
                                className='w-1/4 bg-slate-50 rounded-full bg-opacity-75' 
                                href="https://github.com/gab617?tab=repositories" target='_blank'
                                >
                                    <img src='icons_tecs/github-logo.png' alt="" />
                            </a>
                            <a className='w-1/4 rounded-full' 
                            href="https://www.linkedin.com/in/gabriel-cabrera-sirlopu-0a5700267/" target='_blank'>
                                <img src='linkedin-icon.png' alt="" />

                            </a>
                        </div>
                    </div>

                </div>

                <div className='flex justify-center flex-col w-80 m-auto xl:w-1/2'>
                    <div>
                        <div className={`${loadingEmail ? 'fade-in' : 'fade-out'}`}>
                            <div className="loader-line m-auto"></div>
                            <p className='text-center'>Enviando</p>
                        </div>
                    </div>
                    <ButtonCircles
                        type={'submit'}
                        handleReset={handleReset}
                    />
                    <div>
                        <div className={`flex justify-center ${emailEnviado ? 'fade-in' : 'fade-out'}`}>
                            <button className="btn-mail-enviado lg:w1-2"><i className="animation"></i>Mail enviado!<i className="animation"></i>
                            </button>
                        </div>
                    </div>


                </div>
            </form>
        </section>

    )
}
