import { useState, useMemo } from "react";
import { ptBR } from "@mui/material/locale";
import * as yup from "yup";
import {
  ThemeProvider,
  CssBaseline,
  createTheme,
  Container,
} from "@mui/material";
import { Check } from "@mui/icons-material";

import { useSnackbarContext } from "./contexts";
import {
  Stack,
  Grid,
  GridItem,
  Card,
  CardActions,
  Heading,
  Text,
  Form,
  Input,
  QuantitySpinner,
  Select,
  Autocomplete,
  DatePicker,
  CheckboxGroup,
  Switch,
  Chip,
  Divider,
  Button,
  Tooltip,
  Snackbar,
  Tabs,
  TabPanel,
} from "./components";
import { getCustomTheme } from "./styles";

type Option = {
  id: number;
  label: string;
};

type FormData = {
  name: string;
  email: string;
  currency: string;
  percentage: number | string;
  select: string;
  autocomplete: Option[];
  items: Option[];
  date: string | null;
  switch: boolean;
};

const FormDataSchema = yup.object({
  name: yup.string().required("name is required"),
  email: yup.string().email("invalid email").required("email is required"),
  currency: yup.string().required("currency is required"),
  percentage: yup.string().required("percentage is required"),
  select: yup.string().required("select is required"),
  autocomplete: yup
    .array()
    .min(2, "select at least 2 skills")
    .required("autocomplete are required"),
  items: yup
    .array()
    .min(1, "select at least 1 item")
    .required("items are required"),
  date: yup.date().typeError("date is required"),
  switch: yup.boolean().required("switch is required"),
});

const App: React.FC = () => {
  const { snackbarNotify } = useSnackbarContext();
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");
  const [quantity, setQuantity] = useState(1);
  const [tabIndex, setTabIndex] = useState(0);
  const selectOptions = ["Item 1", "Item 2", "Item 3", "Item 4"];
  const options = useMemo(() => createItems(4), []);
  const theme = useMemo(
    () => createTheme(getCustomTheme(themeMode), ptBR),
    [themeMode]
  );

  function createItems(length: number): Option[] {
    let items = [];
    for (let i = 1; i <= length; i++) {
      const object = {
        id: i,
        label: `Item ${i}`,
      };
      items.push(object);
    }
    return items;
  }

  function handleQuantitySpinnerChange(value: number) {
    setQuantity(value);
  }

  function handleSubmit(data: FormData) {
    console.log(data);
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container sx={{ py: 4 }}>
          <Stack gap={3}>
            <Stack direction="row" gap={3}>
              <Card
                title="Card 1"
                headerAction={
                  <Switch
                    controlled={true}
                    label="Dark Mode"
                    size="medium"
                    checked={themeMode == "dark"}
                    onChange={() =>
                      setThemeMode(themeMode == "light" ? "dark" : "light")
                    }
                  />
                }
              >
                <Stack gap={2}>
                  <Heading variant="h6">Title 1</Heading>
                  <Text>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Odio obcaecati, veniam dolorem aut eligendi quisquam
                    accusantium dolorum cupiditate, ea culpa quae.
                  </Text>
                </Stack>
              </Card>
              <Card bgColor="primary" title="Card 2">
                <Stack gap={2}>
                  <Heading variant="h6">Title 2</Heading>
                  <Text>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Odio obcaecati, veniam dolorem aut eligendi quisquam
                    accusantium dolorum cupiditate, ea culpa quae.
                  </Text>
                </Stack>
              </Card>
            </Stack>
            <Tabs
              tabList={[
                {
                  tabLabel: "Form Components",
                  tabIndex: 1,
                },
                {
                  tabLabel: "Other Components",
                  tabIndex: 2,
                },
              ]}
              labelTextTransform="uppercase"
              onChange={(_, newValue) => setTabIndex(newValue)}
              value={tabIndex}
            >
              <TabPanel value={tabIndex} index={0}>
                <Card title="Register">
                  <Form
                    validationSchema={FormDataSchema}
                    onSubmit={handleSubmit}
                  >
                    <Stack gap={4}>
                      <Grid container spacing={2}>
                        <GridItem xs={3}>
                          <Input name="name" label="Name" />
                        </GridItem>
                        <GridItem xs={3}>
                          <Input id="email" name="email" label="E-mail" />
                        </GridItem>
                        <GridItem xs={3}>
                          <Input
                            name="currency"
                            label="Currency $"
                            mask="currency"
                          />
                        </GridItem>
                        <GridItem xs={3}>
                          <Input
                            name="percentage"
                            label="Percentage %"
                            mask="percentage"
                          />
                        </GridItem>
                      </Grid>
                      <Grid container spacing={2} alignItems="center">
                        <GridItem xs={6}>
                          <Autocomplete
                            name="autocomplete"
                            multiple
                            options={options}
                            getOptionLabel={(option) => option.label}
                            isOptionEqualToValue={(option, value) =>
                              option.label === value.label
                            }
                            renderInput={(props) => (
                              <Input
                                name="autocomplete"
                                label="Autocomplete"
                                {...props}
                              />
                            )}
                          />
                        </GridItem>
                        <GridItem xs={3}>
                          <Select
                            name="select"
                            label="Select"
                            options={selectOptions}
                          />
                        </GridItem>
                        <GridItem xs={3}>
                          <DatePicker name="date" label="Date" />
                        </GridItem>
                      </Grid>
                      <Grid container spacing={2}>
                        <GridItem xs={12}>
                          <CheckboxGroup
                            name="items"
                            label="Items"
                            options={options}
                          />
                        </GridItem>
                      </Grid>
                      <Grid container spacing={2}>
                        <GridItem xs={3}>
                          <Switch name="switch" label="Switch" size="medium" />
                        </GridItem>
                      </Grid>
                      <CardActions>
                        <Button
                          type="submit"
                          color="primary"
                          startIcon={<Check />}
                        >
                          Save
                        </Button>
                      </CardActions>
                    </Stack>
                  </Form>
                </Card>
              </TabPanel>
              <TabPanel value={tabIndex} index={1}>
                <Stack gap={5}>
                  <Grid container spacing={2} alignItems="center">
                    <GridItem xs={3}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() =>
                          snackbarNotify({
                            message: "this is a success message",
                            severity: "success",
                          })
                        }
                      >
                        Open Snackbar
                      </Button>
                      <Snackbar />
                    </GridItem>
                    <GridItem xs={3}>
                      <QuantitySpinner
                        value={quantity}
                        onChange={handleQuantitySpinnerChange}
                      />
                    </GridItem>
                    <GridItem xs={3}>
                      <Chip label="Success" color="success" size="small" />
                    </GridItem>
                    <GridItem xs={3}>
                      <Tooltip title="Tooltip">
                        <Button variant="text">Tooltip</Button>
                      </Tooltip>
                    </GridItem>
                  </Grid>
                  <Divider />
                </Stack>
              </TabPanel>
            </Tabs>
          </Stack>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;
