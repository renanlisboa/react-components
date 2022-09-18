import { useMemo, useState } from "react";
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
  InputSpinner,
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

type FormData = {
  name: string;
  email: string;
  currency: string;
  percentage: number | string;
  creditcard: string;
  skills: string[];
  items: CheckboxItem[];
  date: string | null;
  active: boolean;
};

type CheckboxItem = {
  id: number;
  label: string;
};

const App: React.FC = () => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");
  const [quantity, setQuantity] = useState(1);
  const [tabIndex, setTabIndex] = useState(0);
  const { snackbarNotify } = useSnackbarContext();

  const FormDataSchema = yup.object({
    name: yup.string().required("name is required"),
    email: yup.string().email("invalid email").required("email is required"),
    currency: yup.string().required("currency is required"),
    percentage: yup.string().required("percentage is required"),
    creditcard: yup.string().required("creditcard is required"),
    skills: yup
      .array()
      .min(2, "select at least 2 skills")
      .required("skills are required"),
    items: yup
      .array()
      .min(1, "select at least 1 item")
      .required("items are required"),
    date: yup.date().typeError("date is required"),
    active: yup.boolean().required("active is required"),
  });

  const selectOptions = ["Mastercard", "Visa", "American Express", "Dinners"];
  const options = [
    { id: 1, label: "Typescript" },
    { id: 2, label: "React" },
    { id: 3, label: "NextJS" },
    { id: 4, label: "NodeJS" },
  ];

  const checkBoxItems = createCheckboxItems(3);

  function createCheckboxItems(length: number): CheckboxItem[] {
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

  function handleInputSpinnerChange(value: number) {
    setQuantity(value);
  }

  function handleSubmit(data: FormData) {
    console.log(data);
  }

  const theme = useMemo(() => {
    return createTheme(getCustomTheme(themeMode), ptBR);
  }, [themeMode]);

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
                        <GridItem item xs={3}>
                          <Input name="name" label="Name" />
                        </GridItem>
                        <GridItem item xs={3}>
                          <Input id="email" name="email" label="E-mail" />
                        </GridItem>
                        <GridItem item xs={3}>
                          <Input
                            name="currency"
                            label="Currency $"
                            mask="currency"
                          />
                        </GridItem>
                        <GridItem item xs={3}>
                          <Input
                            name="percentage"
                            label="Percentage %"
                            mask="percentage"
                          />
                        </GridItem>
                      </Grid>
                      <Grid container spacing={2} alignItems="center">
                        <GridItem item xs={6}>
                          <Autocomplete
                            name="skills"
                            multiple
                            options={options}
                            getOptionLabel={(option) => option.label}
                            isOptionEqualToValue={(option, value) =>
                              option.label === value.label
                            }
                            renderInput={(props) => (
                              <Input name="skills" label="Skills" {...props} />
                            )}
                          />
                        </GridItem>
                        <GridItem item xs={3}>
                          <Select
                            name="creditcard"
                            label="Credit Card"
                            options={selectOptions}
                          />
                        </GridItem>
                        <GridItem item xs={3}>
                          <DatePicker name="date" label="Date" />
                        </GridItem>
                      </Grid>
                      <Grid container spacing={4}>
                        <GridItem item xs={12}>
                          <CheckboxGroup
                            name="items"
                            label="Items"
                            options={checkBoxItems}
                          />
                        </GridItem>
                      </Grid>
                      <Grid container spacing={4}>
                        <GridItem item xs={3}>
                          <Switch name="active" label="Active" size="medium" />
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
                  <Grid container spacing={4} alignItems="center">
                    <GridItem item xs={3}>
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
                    <GridItem item xs={3}>
                      <InputSpinner
                        value={quantity}
                        onChange={handleInputSpinnerChange}
                      />
                    </GridItem>
                    <GridItem item xs={3}>
                      <Chip label="Success" color="success" size="small" />
                    </GridItem>
                    <GridItem item xs={3}>
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
