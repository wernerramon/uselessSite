import { Box, Slider, SliderThumb, Typography } from "@mui/material";
import { Mark } from "@mui/material/Slider/useSlider.types";
import { useState, forwardRef } from "react";
import { styled } from "@mui/material/styles";
import { styles } from "./stepped-slider.styles";

interface SteppedSliderProps {
  steps: { mark: Mark; emoji: string }[];
  onChange?: (value: number) => void;
  value: number;
}

// Custom thumb component that forwards the ref and adds type="range" by casting extra props to any
const CustomSliderThumb = forwardRef<HTMLSpanElement, any>(function CustomSliderThumb(
  props,
  ref
) {
  const { children, ...other } = props;
  return (
    <SliderThumb ref={ref} {...(other as any)} type="range">
      {children}
    </SliderThumb>
  );
});

// Styled thumb component for custom appearance
const StyledThumb = styled(CustomSliderThumb)(({ theme }) => ({
  width: 30,
  height: 30,
  transform: "translate(-50%, -50%)",
  // display: "flex",
  // alignItems: "center",
  justifyContent: "center",
  backgroundColor: "transparent",
  borderRadius: "50%",
  fontSize: "30px",
  // fontWeight: "bold",
}));

// Helper to map slider value to a letter (for example, 0 -> "A", 1 -> "B", etc.)
const getLetter = (value: number) => {
  const letters = ["🤓", "🤔", "🙃", "😑"];
  return letters[value] || "A";
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
    <Box sx={{ width: 300, padding: 3 }}>
      <Typography gutterBottom>Printing Mode</Typography>
      <Slider
        style={styles.steppedSlider}
        value={sliderValue}
        onChange={handleChange}
        step={null} // Ensures only predefined values are selectable
        marks={steps.map((step) => step.mark)}
        min={0}
        max={steps.length - 1}
        valueLabelDisplay="off"
        size="medium"
        slots={{
          thumb: (props) => (
            <StyledThumb {...props}>
              {getLetter(sliderValue)}
            </StyledThumb>
          ),
        }}
      />
    </Box>
  );
};

export default SteppedSlider;
