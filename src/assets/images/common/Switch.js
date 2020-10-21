import React from "react";

//?library imports
import { withStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

//?custom IOS style switch
const IOSSwitch = withStyles((theme) => ({
   root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: "12px 20px 0px 12px",
   },
   switchBase: {
      padding: 1,
      "&$checked": {
         transform: "translateX(16px)",
         color: theme.palette.common.white,
         "& + $track": {
            backgroundColor: "#2867b2",
            opacity: 1,
            border: "none",
         },
      },
      "&$focusVisible $thumb": {
         color: "#2867b2",
         border: "6px solid #fff",
      },
   },
   thumb: {
      width: 24,
      height: 24,
   },
   track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[500]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(["background-color", "border"]),
   },
   checked: {},
   focusVisible: {},
}))(({ classes, ...props }) => {
   return (
      <Switch
         focusVisibleClassName={classes.focusVisible}
         disableRipple
         classes={{
            root: classes.root,
            switchBase: classes.switchBase,
            thumb: classes.thumb,
            track: classes.track,
            checked: classes.checked,
         }}
         {...props}
      />
   );
});

export default function IosSwitch({ checked, handleChange, disabled }) {
   return (
      <FormGroup>
         <FormControlLabel
            labelPlacement="start"
            control={
               <IOSSwitch
                  checked={checked}
                  onChange={handleChange}
                  name="successful"
                  disabled={disabled}
               />
            }
            label={<span className="successful">Successful</span>}
         />
      </FormGroup>
   );
}
