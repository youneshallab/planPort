import "dayjs/locale/fr";
import React from "react"; 
import moment from "moment";
import { Box } from '@mui/system';
import Bassin from "./components/Bassin";
import { styled } from '@mui/material/styles';
import "./resources/momentJsFr"
import CircleIcon from '@mui/icons-material/Circle';
import  { useState, useEffect, useRef, useMemo } from "react";
import LoaderAnimation from "./components/LoaderAnimation";
import { LocalizationProvider } from '@mui/x-date-pickers';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InputDateCustomized from "./components/InputDateCustomized";
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import BrowserNotSupportedIcon from '@mui/icons-material/BrowserNotSupported';
import { Grid, IconButton, Typography, Card, CardContent, Button, MobileStepper, Divider } from "@mui/material";
import { instance } from "./common/axios";

const sheetNames = ["Bassin-flot","Bassin-Sec","Bassin-Réparation"];
function App() {
  
  const [dateState, setDateState] = React.useState(new Date());
  const [activeStep, setActiveStep] = React.useState(0);
  const [generatedCells, setGeneratedCells] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([])
  const dataMap = new Map();
  const ref = useRef(null);
  
  // Setting BreakPoints (styling)
  const StyledCardContent = styled(CardContent)(({ theme }) => ({
    padding: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  }));
  
  // Handle Date Change
  const onDateChange = (e) => {
    setIsLoading(true)
    setDateState(e);
    setTimeout(()=>{
      setIsLoading(false)
    },1000)
  };
  
  // API CALL updates on Date update
  useEffect(() => {
    if(dateState !== null){
      instance.get(`/affectationsplan?date=${moment(dateState).format("yyyy-MM-DD")}&bassin=BAF`)
      .then(response => {
        if(response.status === 200){
          setGeneratedCells(response.data)
          console.log("the cells",response.data)
        }
      })
      .catch(error => {
        console.log(error);
      });
    }
  }, [dateState]);
  
  // Handle click next
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setIsLoading(true)
    setTimeout(()=>{
      setIsLoading(false)
    },1000)
  };

  // Handle click back
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setIsLoading(true)
    setTimeout(()=>{
      setIsLoading(false)
    },1000)
  };

  // API CALL updates on Date update
  useEffect(() => {
    if(dateState !== null){
      instance.get(`/affectations?date=${moment(dateState).format("yyyy-MM-DD")}`)
      .then(response => {
        if(response.status === 200){
          setData(response.data)
        }
      })
      .catch(error => {
        console.log(error);
      });
    }
  }, [dateState]);

  // FILL dataMAP
  useEffect(()=>{
    if( data !== []){
      for(let i=0; i < data.length; i++) {
        dataMap.set(data[i]['nom'],{color:data[i]['color'],escaleId:data[i]['escaleId']})
      }}
  },[data,dataMap])

  return (
    <div className="p-4">
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"fr"}>
        <Card style={{ width: "100%" }}>
          <CardContent>
            <Grid
              item
              xs={12}
              style={{
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <h2
                style={{
                  marginRight: "13px",
                  marginLeft: "13px",
                  fontSize: "14px",
                }}
              >
                <b>{moment(dateState).locale('fr').format("dddd, DD MMMM, YYYY")}</b>
              </h2>
              <IconButton
                onClick={() => {
                  document.getElementById("calendarInput").click();
                }}
                aria-label="calendar"
                color="primary"
                position="relative"
              >
                <CalendarMonthIcon style={{ fontSize: "32px" }} />
              </IconButton>
              <Box
                sx={{ flexGrow: 1 }}
                style={{
                  visibility: "hidden",
                  position: "absolute",
                  //top: "95px",
                  boxShadow: "6px 7px 20px -17px",
                }}
              >
                <InputDateCustomized
                  id="calendarInput"
                  label="Choisir une date"
                  value={dateState}
                  onChange={onDateChange}
                />
              </Box>
            </Grid>
          </CardContent>
        </Card>
        <br/>
        <Card sx={{pt: '10px',display: 'flex', flexDirection:'column' }}  >
          <StyledCardContent sx={{width: '100%', display: 'flex', justifyContent: 'space-around'}}>
            <Typography gutterBottom variant="h5" component="div">
              <LocationOnIcon  sx={{mr: '5px'}} className="text-blue-500"/>
              {sheetNames[activeStep]}
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography gutterBottom variant="h5" component="div">
              <CircleIcon fontSize="small" sx={{mr: '5px'}} className="text-green-500"/>
              Disponible
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              <CircleIcon fontSize="small" sx={{mr: '5px'}} className="text-red-500"/>
              Non Disponible
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              <CircleIcon fontSize="small" sx={{mr: '5px'}} className="text-amber-400"/>
              Absent
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              <BrowserNotSupportedIcon sx={{mr: '5px'}} className="text-neutral-400"/>
              Désactivé
            </Typography>
          </StyledCardContent>
          <Divider variant="middle" flexItem />
          <CardContent  ref={ref}>
            {isLoading ?
            <div className='h-48 overflow-auto w-full flex justify-center'>
                <div className='flex relative'>
                    <LoaderAnimation color={'blue'}/> 
                </div>
            </div>:
            <Bassin generatedCells={generatedCells}/>}
          </CardContent>
          <MobileStepper
            variant="dots"
            steps={sheetNames.length}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button size="small" onClick={handleNext} disabled={activeStep === sheetNames.length-1}>
                  <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                <KeyboardArrowLeft />
              </Button>
            }
          />
        </Card>
      </LocalizationProvider>
      </div>
    )
  }

export default App;
