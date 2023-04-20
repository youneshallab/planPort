import React from 'react';
import GroupParking from './GroupParking';
import planImg from '../resources/smirhd2.jpg';
import places from '../resources/place.js';

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

function Bassin({generatedCells}) {
    console.log(generatedCells)
    const Cells = () => {
        const cells = generatedCells.map(group => {
            return (
                <GroupParking 
                    key={group.groupeId}
                    group={group}
                    ></GroupParking>
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
