import React from 'react'
import {Link} from 'react-router-dom'
import Farologo from "../assets/images/Farologo.png";
import Object from "../assets/images/Object.svg"
import moreInformation from "../assets/images/moreInformation.svg";

 const AboutPage = () => {
  return (
    <>
      <div className='w-screen h-screen backgroundAboutUs no-scrollbar text-white p-32'>
        <div>
          <div>
            <h1 className='text-5xl ml-8'>
              Faro ayuda a los estudiantes<br/>
              a encontrar su vocación
            </h1>
            <p className='texte-base ml-8 mt-8'>
              Muchas veces como estudiante no sabemos que queremos estudiar,<br/>
              donde estudiar o simplemente cuales son las opciones, ahí es donde<br/>
              faro nos ayuda.
            </p>
            <Link to="/"> <button className='text-white button ml-8 mt-8'> Empezar a buscar </button> </Link>
          </div>
        </div>
          <div className='w-85% flex justify-around mx-20 mt-40 '>
            <div className='w-64'>
             <div className='flex'>
                <img src={Farologo}  alt='Faro Logo' className='w-11'/>
                <h3 className='text-2xl'>
                  ¿Qué es Faro?
                </h3>
             </div>
              Faro es una herramienta visual para<br/>
              poder encontrar un centro de<br/>
              estudio y así evitar la deserción<br/> 
              estudiantil por no saber qué<br/>
              estudiar o donde.
            </div>
            <div className='w-64'>
              <div className='flex'>
                <img src={Object} alt="Our Objective" className='w-16'/>
                <h3 className='text-2xl'>
                  Nuestro objetivo
                </h3>
              </div>
              El objetivo de Faro es poder mejorar<br/>
              la calidad educativa de las <br/>
              personas, para preservar el <br/>
              crecimiento educativo y hacer una <br/>
              diferencia en el país.
            </div>
            <div className='w-64'>
              <div className='flex'>
                <img src={moreInformation} alt='More Information' className='w-11'/>
                <h3 className='text-2xl'>
                  Más información
                </h3>
              </div>
              Faro es una aplicación web parte de <br/>
              un proyecto final de estudiantes de <br/>
              Administración y TIC en Ánima <br/>
              como parte de una solución a una <br/>
              ODS con intereses en mejorar la <br/>
              educación de calidad y la deserción <br/>
              de la misma. 
            </div>
          </div>
      </div>
    </>
  );
}

export default AboutPage;
