import { Tabs as MuiTabs, Tab, TabsProps as MuiTabsProps } from "@mui/material";

type TabsProps = MuiTabsProps & {
  tabList: Array<{
    tabLabel: string;
    tabIndex: number;
  }>;
  labelTextTransform?: "uppercase" | "capitalize" | "none";
};

export function Tabs({
  variant = "fullWidth",
  indicatorColor = "primary",
  textColor = "inherit",
  tabList,
  labelTextTransform = "uppercase",
  children,
  ...rest
}: TabsProps) {
  return (
    <>
      <MuiTabs
        aria-label="full width tabs"
        variant={variant}
        indicatorColor={indicatorColor}
        textColor={textColor}
        {...rest}
      >
        {tabList.map(({ tabLabel, tabIndex }) => (
          <Tab 
            sx={{ textTransform: labelTextTransform }}
            key={tabIndex} 
            label={tabLabel} 
            {...a11yProps(tabIndex)} 
          />
        ))}
      </MuiTabs>
      {children}
    </>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
