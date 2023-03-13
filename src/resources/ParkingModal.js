import React from 'react';
import Modal from 'react-modal';
import { useState , useEffect } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import LoaderAnimation from '../components/LoaderAnimation';
import { instance } from '../common/axios';
import changeDateFormat from '../Utils/changeDateFormat';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0px',
    width: '50%',
    minWidth: '500px',
    minHeight: '450px',
    height: '50%',
  },
};

const fieldNameClass = 'absolute left-1/2 translate-x-[-100%] font-semibold';
const fieldValueClass = 'relative left-1/2 ml-2 w-fit';
Modal.setAppElement(document.getElementById('root'));

function ParkingModal({closeModal, isOpenModal,value, escaleId}) {
  const [ escaleData, setEscaleData ] = useState([])
  const [tab, setTab] = React.useState('1');
  const [isLoading, setIsLoading] = useState(true)

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  
  useEffect(() => {
    instance.get(`/affectations/escaleInformation?escaleId=${escaleId}`)
    .then(response => {
      if(response.status === 200){
        setEscaleData(response.data)
        setIsLoading(false)
      }
    })
    .catch(error => {
      setEscaleData([])
      console.log(error);
    });
  }, [escaleId]);

  return (
    <div>
      <Modal
        isOpen={isOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        >
        {isLoading? 
          <LoaderAnimation color="blue"/>:
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={tab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Réservation" value="1" />
                <Tab label="Client" value="2" />
                <Tab label="Bateau" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
            <div className=''>
            <div className=' pb-4 bg-white shadow-custom rounded'>
              <header className='bg-gradient-to-r  rounded-t bg-[#c1d3d5] h-12 p-3 text-black font-bold text-center'>Emplacement {value}</header>
              <div>
                <h3 className='mt-2 mb-2 font-bold text-center text-red-700'>
                  Numéro de réservation : {escaleData.numReservation? escaleData.numReservation:'-'}
                </h3>
                <div>
                  <p className={fieldNameClass}>Statut :</p>
                  <p className={fieldValueClass}> {escaleData.statut? escaleData.statut:'-'}</p>
                </div>
                <div>
                  <p className={fieldNameClass}>Client :</p>
                  <p className={fieldValueClass}> {escaleData.nomPrenom? escaleData.nomPrenom:'-'}</p>
                </div>
                <div>
                  <p className={fieldNameClass}>Bateau :</p>
                  <p className={fieldValueClass}> {escaleData.bateauNom? escaleData.bateauNom:'-'}</p>
                </div>
                <div>
                  <p className={fieldNameClass}>Arrivée :</p>
                  <p className={fieldValueClass}> {escaleData.arrivee? changeDateFormat(escaleData.arrivee):'-'}</p>
                </div>
                <div>
                  <p className={fieldNameClass}>Départ :</p>
                  <p className={fieldValueClass}> {escaleData.depart? changeDateFormat(escaleData.depart):'-'}</p>
                </div>
                <div>
                  <p className={fieldNameClass}>Longueur :</p>
                  <p className={fieldValueClass}> {escaleData.longueur? escaleData.longueur:'-'} m</p>
                </div>
                <div>
                  <p className={fieldNameClass}>Prix :</p>
                  <p className={fieldValueClass}> {escaleData.prix? escaleData.prix:'-'} dhs</p>
                </div>
                <div>
                  <p className={fieldNameClass}>Confirmé le :</p>
                  <p className={fieldValueClass}> {escaleData.confirmeLe ? changeDateFormat(escaleData.confirmeLe):'-'}</p>
                </div>
              </div>
              </div>
          </div>
            </TabPanel>
            <TabPanel value="2">
            <div className=''>
            <div className='pb-4 bg-white shadow-custom rounded'>
              <header className='bg-gradient-to-r text-black rounded-t bg-[#c1d3d5] h-12 p-3 font-bold text-center'>Client</header>
              <div>
                <h3 className='mt-2 mb-2 font-bold text-center text-red-700'>{escaleData.nomPrenom}</h3>
                <div>
                  <p className={fieldNameClass}>Email :</p>
                  <p className={fieldValueClass}> {escaleData.email? escaleData.email:'-'}</p>
                </div>
                <div>
                  <p className={fieldNameClass}>N° Téléphone :</p>
                  <p className={fieldValueClass}> {escaleData.telephone? escaleData.telephone:'-'}</p>
                </div>
                <div>
                  <p className={fieldNameClass}>Nationalité :</p>
                  <p className={fieldValueClass}> {escaleData.nationalite? escaleData.nationalite:'-'}</p>
                </div>
              </div>
              </div>
          </div>
            </TabPanel>
            <TabPanel value="3">
            <div className=''>
            <div className='pb-4 bg-white shadow-custom rounded'>
              <header className='bg-gradient-to-r rounded-t bg-[#c1d3d5] h-12 p-3 text-black font-bold text-center'>Bateau</header>
              <div>
                <h3 className='mt-2 mb-2 font-bold text-center text-red-700'> {escaleData.bateauNom? escaleData.bateauNom:'-'}</h3>
                <div>
                  <p className={fieldNameClass}>Type :</p>
                  <p className={fieldValueClass}> {escaleData.bateauType? escaleData.bateauType:'-'}</p>
                </div>
                <div>
                  <p className={fieldNameClass}>Longueur :</p>
                  <p className={fieldValueClass}> {escaleData.longueur? escaleData.longueur:'-'} m</p>
                </div>
                <div>
                  <p className={fieldNameClass}>Largeur :</p>
                  <p className={fieldValueClass}> {escaleData.largeur? escaleData.largeur:'-'} m</p>
                </div>
                <div>
                  <p className={fieldNameClass}>Modèle :</p>
                  <p className={fieldValueClass}> {escaleData.bateauModele? escaleData.bateauModele:'-'}</p>
                </div>
                <div>
                  <p className={fieldNameClass}>Immatriculation :</p>
                  <p className={fieldValueClass}> {escaleData.immatriculation? escaleData.immatriculation:'-'}</p>
                </div>
              </div>
              </div>
          </div>
            </TabPanel>
          </TabContext>
        </Box>}
      </Modal>
    </div>
  );
}
export default ParkingModal;