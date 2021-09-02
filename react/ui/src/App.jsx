import { HashRouter as Router, Route, Switch } from "react-router-dom";

// Styling
import "./App.css";
import { Grommet, Box } from "grommet";
import {
  CodeSandbox,
  Group,
  SettingsOption,
} from "grommet-icons";
import Sidebar from "./components/Sidebar"

// Components
import Home from "./pages/Landing/Home";
import NotFound  from "./pages/NotFound";
import theme from "./assets/theme";
import Docs from "pages/Docs/Docs";
import Settings from "pages/Settings";

const items = [
  // {
  //   label: "Docs",
  //   Icon: Group,
  //   path: "/docs",
  // },
  {
    label: "Settings",
    Icon: SettingsOption,
    path: "/settings",
  },
];

const App = () => {
  return (
    <Router>
      <Grommet theme={theme} full>
        <Box direction="row" fill>
          <Sidebar
            appIcon={<CodeSandbox color="brand" />}
            appName="Generate Bundle"
            items={items}
          />
          <Box flex>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/docs" component={Docs} />
              <Route exact path="/settings" component={Settings} />
              <Route component={NotFound} />
            </Switch>
          </Box>
        </Box>
      </Grommet>
    </Router>
  );
};

export default App;
