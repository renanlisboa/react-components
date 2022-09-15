import { ReactNode } from "react";
import { Fade } from '@mui/material'

import { Box } from ".";

type TabPanelProps = {
  children?: ReactNode;
  dir?: string;
  index: number;
  value: number;
};

export function TabPanel({ value, index, children, ...rest }: TabPanelProps) {
  return (
    <Fade in={value === index} timeout={300}>
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...rest}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    </Fade>
  );
}
