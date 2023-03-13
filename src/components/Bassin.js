import React from 'react';
import SingleParking from './SingleParking';
import planImg from '../resources/planEmpty3.png';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

function Bassin({generatedCells}) {
    
    const Cells = () => {
        const cells = generatedCells.map(aff => {
            return (
                <SingleParking 
                    key={aff.nom}
                    parking={aff}
                    ></SingleParking>
            )
        })
        return cells 
    }

    return (
    <div className=' h-full overflow-auto w-full flex justify-center'>
        <TransformWrapper>
            <TransformComponent>
                <div className='w-[1600px]'>
                    <img src={planImg} alt="test" width={1600}/>
                </div>
                <div className='absolute'>
                    <Cells className='absolute'/>
                </div>
            </TransformComponent>
        </TransformWrapper>
    </div>
    )
      
}

export default Bassin
