import React from 'react'
import SingleParking from './SingleParking'
import {useRef, useEffect, useCallback} from 'react';

function GroupParking({group}) {
    const ref = useRef(null);
    useEffect(() => {
        // ********************************************************************************
        const tempGroup = `group${group.id}`
        ref.current.classList.add(tempGroup)
        var cellGrp = document.querySelectorAll(`.${tempGroup}`);
        for (let i = 0; i < cellGrp.length; i++) {
              cellGrp[i].style.top = `${parseInt(group.y)}px`
              cellGrp[i].style.left = `${parseInt(group.x)}px`
              cellGrp[i].style.width = `${parseInt(group.width)}px`
              cellGrp[i].style.height = `${parseInt(group.height)}px`
              cellGrp[i].style.transform = `rotate(${group.angle}turn)`
            }
      },[group])
    
    const Cells = () => {
        const cells = group?.listPlaces?.sort(sortByName()).map(place => {
            return (
                <SingleParking 
                    key={place.id}
                    place={place}
                    width={group.width/group.listPlaces.length}
                    ></SingleParking>
            )
        })
        return cells 
    }
    
  return (
    <div 
    ref={ref}
    className = ' flex absolute justify-between  '>
        <Cells/>
    </div>
  )
}

export default GroupParking

function sortByName(){
  return function(a,b){
    if(a.nom[0]==="P"){
      if(parseInt(a.nom.substring(2))<parseInt(b.nom.substring(2))){return -1;}
    }else{if(parseInt(a.nom) < parseInt(b.nom)){return -1;}}
      return 1;
  }
}