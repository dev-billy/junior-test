import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "./routes";
function App() {
  return (
    <Router>
      <Switch>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} exact={route.exact}>
            <route.component />
          </Route>
        ))}
      </Switch>
    </Router>
  );
}
export default App;
