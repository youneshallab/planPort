import React, {useEffect} from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import EventIcon from "@mui/icons-material/Event";
import { isMobile } from "react-device-detect";
import "dayjs/locale/fr";

import InputDateActionBar from "./InputDateActionBar";

function InputDateCustomized(props) {
  const [value, setValue] = React.useState(props.value);
  const [dateOpen, setDateOpen] = React.useState(false);

  const handleChange = (newValue) => {
    if (newValue?.$d) {
      var date = new Date(newValue?.$d);
      date.setHours(12, 0, 0);
      setValue(date);
      props.onChange(date);
    } else {
      setValue(newValue);
      props.onChange(newValue);
    }
  };


  useEffect(() => {
    handleChange(props.value);
  }, [props.value]);
  
  let newProps;
  newProps = { ...props };
  delete newProps.primaryColor;
  delete newProps.dispatch;
  delete newProps.iconColor;

  if (isMobile) {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"fr"}>
        <MobileDatePicker
          {...newProps}
          //readOnly
          inputFormat="DD/MM/YYYY"
          components={{ ActionBar: InputDateActionBar }}
          value={props.value === "" ? null : value}
          // open={dateOpen}
          // onClose={() => setDateOpen(false)}
          onChange={handleChange}
          minDate={props.min}
          maxDate={props.max}
          disabled={props.disabled}
          inputProps={{ placeholder: "--/--/----" }}
          renderInput={(params) => (
            <TextField
              {...params}
              {...newProps}
              InputLabelProps={
                props.required
                  ? { shrink: true, required: true }
                  : { shrink: true }
              }
              // onClick={() => setDateOpen(true)}
              InputProps={{
                endAdornment: <EventIcon style={{ color: props.iconColor }} />,
              }}
            />
          )}
        />
      </LocalizationProvider>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"fr"}>
      <DesktopDatePicker
        {...newProps}
        //readOnly
        inputFormat="DD/MM/YYYY"
        value={props.value === "" ? null : value}
        open={dateOpen}
        onClose={() => setDateOpen(false)}
        onChange={handleChange}
        minDate={props.min}
        maxDate={props.max}
        disabled={props.disabled}
        inputProps={{ placeholder: "--/--/----" }}
        renderInput={(params) => (
          <TextField
            {...params}
            {...newProps}
            InputLabelProps={
              props.required
                ? { shrink: true, required: true }
                : { shrink: true }
            }
            onClick={() => setDateOpen(true)}
            InputProps={{
              endAdornment: (
                <EventIcon
                  style={{ color: props.iconColor, cursor: "pointer" }}
                />
              ),
              autoComplete: "off",
            }}
            onKeyDown={(e) => e.preventDefault()}
          />
        )}
      />
    </LocalizationProvider>
  );
}

export default InputDateCustomized;
