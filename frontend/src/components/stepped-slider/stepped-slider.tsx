import { Box, Slider, Typography } from "@mui/material";
import { Mark } from "@mui/material/Slider/useSlider.types";
import { useState } from "react";
import { styles } from "./stepped-slider.styles"


interface SteppedSliderProps {
    marks: Mark[];
    onChange?: () => void;
    value: number
}

const SteppedSlider = ({onChange, marks, value}: SteppedSliderProps) => {
    const [sliderValue, setSliderValue] = useState(0);
    
    const handleChange = (event: any, newValue: any) => {
        setSliderValue(newValue);
    };
    
    return (
        <Box sx={{ width: 300, padding: 3 }}>
          <Typography gutterBottom>Printing Mode</Typography>
          <Slider
            style={styles.steppedSlider}
            value={sliderValue}
            onChange={handleChange}
            step={null} // Ensures only predefined values are selectable
            marks={marks}
            min={0}
            max={marks.length - 1}
            valueLabelDisplay="off"
            size="medium"
          />
        </Box>
      );
}

export default SteppedSlider;