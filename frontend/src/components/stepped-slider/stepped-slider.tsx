import { Box, Slider, SliderThumb, Typography } from "@mui/material";
import { Mark } from "@mui/material/Slider/useSlider.types";
import { useState, forwardRef } from "react";
import { styled } from "@mui/material/styles";
import { styles } from "./stepped-slider.styles";

interface SteppedSliderProps {
  steps: { mark: Mark; emoji: string; label: string }[];
  onChange?: (value: number) => void;
  value: number;
}

interface EmojiSliderThumbProps extends React.HTMLAttributes<unknown> {}

// Custom thumb component that forwards the ref and adds type="range" by casting extra props to any
// This avoids any runtime errors due to the custom thumb
const EmojiSliderThumb = (
  props: EmojiSliderThumbProps
) => {
  const { children, ...other } = props;
  return (
    <SliderThumb {...(other as any)} type="range">
      {children}
    </SliderThumb>
  );
};

const SteppedSlider = ({ onChange, steps, value }: SteppedSliderProps) => {
  const [sliderValue, setSliderValue] = useState(value);

  const handleChange = (event: any, newValue: any) => {
    setSliderValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Box sx={styles.boxStyle}>
      <Slider
        style={styles.baseStyle}
        value={sliderValue}
        onChange={handleChange}
        step={null} // Ensures only predefined values are selectable
        marks={steps.map((step) => step.mark)}
        sx={{
          "& .MuiSlider-mark": styles.markStyle
        }}
        min={0}
        max={steps.length - 1}
        valueLabelDisplay="off"
        size="medium"
        slots={{
          thumb: (props) => (
            <EmojiSliderThumb {...props} style={{
              // merge MUI's inline styles with your custom style
              ...props.style,
              ...styles.thumbStyle,
            }}>
              {steps[sliderValue].emoji}
            </EmojiSliderThumb>
          ),
        }}
      />
      <Typography style={styles.labelStyle}>"{steps[sliderValue].label}"</Typography>
    </Box>
  );
};

export default SteppedSlider;
