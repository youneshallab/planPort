import React from 'react'
import {useRef, useEffect, useCallback} from 'react';
import ParkingModal from '../resources/ParkingModal';
import boat from '../resources/boat.svg';
import Tooltip from '@mui/material/Tooltip';

function SingleParking({place,width,groupAngle}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [closeRequest, setCloseRequest] = React.useState(false);
  var boatClassName =''
  var nomClassName=' text-[10px] text-blue-900 my-auto mx-auto '
  if(groupAngle < 0.25){
    nomClassName = nomClassName.concat(' rotate-90 ')
  }else{
    if(groupAngle < 0.5){
      nomClassName = nomClassName.concat(' -rotate-90 ')
    }else{
      if(groupAngle < 0.75){
        nomClassName = nomClassName.concat(' rotate-180 ')
      }else{
        nomClassName = nomClassName.concat(' rotate-90 ')
      }
    }
  }
  useEffect(() => {
    // SET ROW ********************************************************************************
    const tempCell = `cell${place?.id}`
    ref.current.classList.add(tempCell)
    var cellGrp = document.querySelectorAll(`.${tempCell}`);
    for (let i = 0; i < cellGrp.length; i++) {
          //cellGrp[i].style.top = `${parseInt(place.Y)}px`
          //cellGrp[i].style.left = `${parseInt(place.X)}px`
          cellGrp[i].style.width = `${parseInt(width)}px`
          cellGrp[i].style.height = `${parseInt(place?.height)}px`
          //cellGrp[i].style.transform = `rotate(${parseInt(place.ANGLE)}deg)`
        }
    // Cells will be visible only after all of their Style is set
    if(ref.current !== null){
      ref.current.classList.add(`cellk`)
      var allCellsHidden = document.querySelectorAll(`.cellk`);
      for (let i = 0; i < allCellsHidden.length; i++) {
            allCellsHidden[i].style.visibility = 'visible';
          }
    }
  },[place])

  // SET Classname
  var classname = 'invisible font-bold text-zinc-100 border-2 cursor-pointer '
  if(parseInt(place?.width) < 6){
    classname = classname.concat(' border-[1px] ')
  }
    switch(place?.color){
      case "#FF0000":
        classname = classname.concat('  bg-red-500 border-red-700 hover:bg-red-400 hover:border-red-400')
        break;
      case "#00FF00":
        classname = classname.concat('  bg-green-500 border-green-900 hover:bg-green-400 hover:border-green-400')
        break;
      case "#FFA500":
        classname = classname.concat('  bg-amber-500 border-amber-700 hover:bg-amber-400 hover:border-amber-400')
        break;
      case "#A1A1AA":
        classname = classname.concat('  border-[1px] bg-zinc-100 border-zinc-900')
        break;
      default:
        classname = classname.concat('  bg-green-500 border-green-900 hover:bg-green-400 hover:border-green-400')
    }

  function closeModal() {
    setCloseRequest(true)
  }

  const openModal = useCallback(() => {
    setIsHovered(false)
    if(place.color === "#FF0000" || place.color === "#FFA500"){
      setIsOpen(true);
    }
  }, [setIsOpen,place?.color]);

  useEffect(()=>{
    if(closeRequest){
      setIsOpen(false);
      setCloseRequest(false);
    }
  }, [isOpen, closeRequest])

  const setHovered = () => {
    setIsHovered(true)
  }

  const unsetHovered = () => {
    setIsHovered(false)
  }

  return (
    <span>
    <Tooltip title={`${place?.nom}`}>
      <div 
        ref={ref}
        className={classname}
        onClick={openModal}
        onMouseEnter={setHovered}
        onMouseLeave={unsetHovered}
        > 
        {place?.color === "#A1A1AA" && <div className=' h-full w-full crossed'></div>}
        <span>
          <p className='text-zinc-100 text-center h-full w-full align-middle truncate text-[8px] flex content-center justify-center'> 
          {(place?.color === "#FF0000") && <img className={boatClassName} src={boat} alt="SVG logo"/>}
          {(place?.color === "#FFA500") && <img className={boatClassName} src={boat} alt="SVG logo"/>}
          {((place.color === "#00FF00" || place.color == null 
              || place.color === "#A1A1AA" )&& width > 19) &&
              <p className={nomClassName}>{place.nom}</p>}
          </p>
        </span>
      </div>
    </Tooltip>
    {isOpen && <ParkingModal 
    closeModal={closeModal} 
    isOpenModal={isOpen} 
    value={place?.value}
    escaleId={place?.escaleId}/>}
  </span>
  )
}

export default SingleParking 