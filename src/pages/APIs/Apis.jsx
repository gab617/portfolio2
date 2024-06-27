/* eslint-disable react/jsx-key */
import { Link } from "react-router-dom";
import { endPointsProjects } from "../../assets/jsonData.json"
import { useState } from "react";
import './Apis.css'

export function Apis() {
  const [data, setData] = useState('')
  const [image, setImage] = useState()
  const [urlServer, setUrlServer] = useState('')
  const [currentEndpoint, setEndpoint] = useState('')
  const [descriptionEndPoint, setDescriptionEndpoint] = useState('')
  const [detailsEndpoint, setDetailsEndpoint] = useState([])
  const [loaderData, setLoaderData] = useState(false)

  const [key, setKey] = useState('')
  const [endpoints, setEndpoints] = useState([])

  function handleClickEndP(ep, urlApi) {
    const { url, description, details } = ep
    setEndpoint(url)
    setUrlServer(urlApi)
    setDescriptionEndpoint(description)
    setDetailsEndpoint(details)
  }

  function handleChangeRequest(evt) {
    evt.preventDefault()
    let nwEndpoint = evt.target.value
    setEndpoint(nwEndpoint)
  }

  function handleClickRequest() {
    if (loaderData){
      console.log('Ya hay una peticion en marcha')
      return
    }
    let fullUrlRequest = urlServer + currentEndpoint
    setLoaderData(true)
    fetchData(fullUrlRequest)
      .then(({ status, data }) => {
        console.log('Estado de la respuesta:', status);
        console.log('Datos recibidos:', data);
        let dataFormat = JSON.stringify(data, null, 3)
        setData(dataFormat)

      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
        setData(error)
      })
      .finally(() => {
        setLoaderData(false)
      })
  }



  function handleClickKey(k) {
    setKey(k)
    setEndpoints(endPointsProjects[k].endpoints)
    setDescriptionEndpoint('')
    setDetailsEndpoint([])
    setEndpoint('')
  }

  return (
    <div>
      <header className='
        sticky top-0 
        bg-black 
        p-1 
        bg-opacity-10 z-50
        sm:text-xl 
        xl:m-auto 
        '>
        <nav className='flex justify-between items-center xl:w-90 xl:m-auto'>
          <div className='ml-2 mt-2 w-12 sm:w-15 md:w-10 xl:w-16'>
            <img className='rounded-full' src="logo.webp" alt="" />
          </div>
          <ul className='flex justify-between gap-5 mr-2 ul-header'>
            <li>
              <Link to='/'>Volver</Link>
            </li>
          </ul>
        </nav>

      </header>

      <div className="
      lg:flex 
      lg:justify-center 
      lg:gap-4 lg:w-full
      lg:text-xl
      ">
        <div className="lg:w-1/4">
          <h1 className="mt-2 mb-2  text-xl">APIs</h1>
          <div
            className="
            flex
            gap-2
            mb-1
            "
          >
            {
              Object.keys(endPointsProjects).map(key => {
                let title = endPointsProjects[key]?.title

                return (
                  <div className="
              bg-emerald-950 rounded-lg p-2 
              w-full
              text-center
              cursor-pointer
              drop-shad-tecno
              hover:bg-emerald-800
              "
                    onClick={() => handleClickKey(key)}
                  >
                    <h1
                      className=""
                    >{title}</h1>
                  </div>
                )
              })
            }
          </div>

          <div className="
      "
          >
            <h1 className="
          mb-2
          text-xl
          font-semibold
        "
            >Endpoints {endPointsProjects[key]?.title}</h1>
            <div className="
        ">
              {
                endpoints.map(ep => {
                  let urlApi = endPointsProjects[key].api
                  return (
                    <div
                      onClick={() => handleClickEndP(ep, urlApi)}
                      className="
                  drop-shad-tecno
                  p-1
                  cursor-pointer
                  "
                    >
                      <button
                        className="
                        border-2
                    btn-endpoint
                    w-full
                    text-start
                    pl-2
                    pt-1
                    pb-1
                    rounded-sm
                    bg-emerald-600
                    text-black
                    font-bold
                    hover:bg-white
                    hover:bg-opacity-70
                    "

                      >{ep.url}</button>
                    </div>
                  )
                })
              }
            </div>
          </div>

          <div>
            <div className="flex flex-col">
              {/* endpoint */}
              <p className="
          mt-3 text-xl
          font-semibold"
              >Input:</p>
              <input className="
      bg-black 
      font-semibold
      border-2
      bg-opacity-50 
      p-2 mt-1 mb-1
      "
                value={currentEndpoint}
                onChange={handleChangeRequest}
              />
              <div className="flex items-center justify-center w-5 h-3 m-auto mb-1">
                {loaderData &&
                  <>
                    <div className="chaotic-orbit"></div>
                  </>
                }
              </div>
              <div className="flex flex-col justify-center items-center mt-2">

                <button
                  className="
            drop-shad-tecno
            text-start
            bg-emerald-400
            bg-opacity-80
            text-black
            font-semibold
            p-3
            rounded-md
            hover:bg-emerald-100
            "
                  onClick={() => handleClickRequest()}
                >Solicitar
                </button>

                <h1 className="
          text-2xl          
          ">☆</h1>
              </div>

            </div>
          </div>


        </div>

        {/* DESCRIPTION API */}
        <div className="  
        p-2
        lg:mt-3
        lg:w-1/4 
        ">
          <p className="lg:mb-3">{descriptionEndPoint}</p>
          <ul className="">
            {
              detailsEndpoint && detailsEndpoint.map(det => {
                return (
                  <li className="
                    whitespace-pre-line
                   bg-black bg-opacity-65 rounded-lg p-2 mb-1">
                    {det}
                  </li>
                )
              })
            }
          </ul>
        </div>

        {/* TEXTAREA */}

        <div className="mt-3 lg:w-1/2">
          <h1 className="
        text-xl
        font-semibold"
          >RESPUESTA JSON:</h1>
          <img src={image} alt="" />
          <textarea
            className="

          text-black 
            font-semibold
            w-full
            
            text-base
            bg-emerald-500
            bg-opacity-50
            border-2
            border-emerald-950
            rounded-lg
            p-1
          "
            value={data}
            readOnly
            rows="30"
            cols="50"
          />

        </div>
      </div>





    </div>
  )
}

async function fetchData(url) {
  try {
    const response = await fetch(url);
    const status = response.status;

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${status}`);
    }

    const data = await response.json();
    return { status, data };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;

  }
}

async function fetchImage(url) {
  try {
    const response = await fetch(url);
    const status = response.status;

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${status}`);
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    return { status, imageUrl };
  } catch (error) {
    console.error('Error fetching image:', error);
    throw error;
  }
}