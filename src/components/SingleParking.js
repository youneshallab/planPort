import React from 'react'
import {useRef, useEffect, useCallback} from 'react';
import ParkingModal from '../resources/ParkingModal';
import { GiSailboat } from 'react-icons/gi';
function SingleParking(props) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [closeRequest, setCloseRequest] = React.useState(false);
  
  useEffect(() => {
    // SET ROW ********************************************************************************
    const tempCell = `cell${props.parking.nom}`
    ref.current.classList.add(tempCell)
    var cellGrp = document.querySelectorAll(`.${tempCell}`);
    for (let i = 0; i < cellGrp.length; i++) {
          cellGrp[i].style.top = `${props.parking.y}px`
          cellGrp[i].style.left = `${props.parking.x}px`
          cellGrp[i].style.width = `${props.parking.width}px`
          cellGrp[i].style.height = `${props.parking.height}px`
        }
    // Cells will be visible only after all of their Style is set
    if(ref.current !== null){
      ref.current.classList.add(`cellk`)
      var allCellsHidden = document.querySelectorAll(`.cellk`);
      for (let i = 0; i < allCellsHidden.length; i++) {
            allCellsHidden[i].style.visibility = 'visible';
          }
    }
  },[props.parking])

  // SET Classname
  var classname = 'invisible font-bold text-zinc-100 absolute'// /!\ WEAK TEST
    switch(props.parking.color){
      case "#FF0000":
        classname = classname.concat(' cursor-pointer border-2 border-red-600 hover:bg-red-600/50 hover:border-red-500')
        break;
      case "#00FF00":
        classname = classname.concat(' cursor-pointer border-2 border-green-600 hover:bg-green-600/50 hover:border-green-500')
        break;
      case "#FFA500":
        classname = classname.concat(' cursor-pointer border-2 border-amber-600 hover:bg-amber-600/50 hover:border-amber-500')
        break;
      case "#A1A1AA":
        classname = classname.concat(' cursor-pointer border-2 border-zinc-400')
        break;
      default:
        classname = classname.concat(' cursor-pointer border-2 border-green-600 hover:bg-green-600 hover:border-green-500')
    }
  

  function closeModal() {
    setCloseRequest(true)
  }

  const openModal = useCallback(() => {
    setIsHovered(false)
    if(props.parking.color === "#FF0000" || props.parking.color === "#FFA500"){
      setIsOpen(true);
    }
  }, [setIsOpen,props.parking.color]);

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
    <div 
      ref={ref}
      className={classname}
      onClick={openModal}
      onMouseEnter={setHovered}
      onMouseLeave={unsetHovered}
      >                                                            
        {props.parking.color === "#A1A1AA" && <div className='absolute h-full w-full crossed'></div>}
        <p className='text-zinc-100 text-center h-full w-full align-middle truncate text-[8px] flex content-center justify-center'> 
          {(props.parking.color === "#FF0000") && (isHovered ?
           <p className='my-auto '>{props.parking.nom}</p>:
           <GiSailboat className=' scale-x-[2]  scale-y-[1] text-[#FF0000] text-base	'/>)}
          {(props.parking.color === "#FFA500") && (isHovered ?
           <p className='my-auto '>{props.parking.nom}</p>:
           <GiSailboat className=' scale-x-[2] scale-y-[1] text-[#FFA500] text-base	'/>)}
          {(props.parking.color === "#00FF00" || props.parking.color == null 
          || props.parking.color === "#A1A1AA" )&& 
          <p className='my-auto '>{props.parking.nom}</p>}
        </p>
        {isOpen && <ParkingModal 
        closeModal={closeModal} 
        isOpenModal={isOpen} 
        value={props.parking.value}
        escaleId={props.parking.escaleId}/>}
    </div>
  )
}

export default SingleParking 