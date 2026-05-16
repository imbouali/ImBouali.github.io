import { Route, Switch } from "wouter";
import Landing from "./Landing";
import Oops404 from "./Oops404";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Landing} />
      <Route path={"/404"} component={Oops404} />
      {/* Final fallback route */}
      <Route component={Oops404} />
    </Switch>
  );
}

function PortfolioApp() {
  return (
    <Router />
  );
}

export default PortfolioApp;
