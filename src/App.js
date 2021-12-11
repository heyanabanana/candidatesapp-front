import { Route } from "wouter";
import { UserContextProvider } from "./config/UserContext";
import NavBar from "./components/NavBar";
import SectionContainer from "./components/SectionContainer";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import CandidateDetail from "./pages/CandidateDetail";
import NewCandidate from "./pages/NewCandidate";
import NewExperience from "./pages/NewExperience";
import AddSkill from "./pages/AddSkill";

function App() {
  return (
    <UserContextProvider>
      <SectionContainer className="App">
        <NavBar />
        <Route path="*" component={NotFound} />
        <Route path="/" component={HomePage} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={UserDashboard} />
        <Route path="/addskill/:id">
          {(params) => <AddSkill id={params.id} />}
        </Route>
        <Route path="/dashboard/:id">
          {(params) => <CandidateDetail id={params.id} />}
        </Route>
        <Route path="/newcandidate" component={NewCandidate} />
        <Route path="/newexperience/:id">
          {(params) => <NewExperience id={params.id} />}
        </Route>
      </SectionContainer>
    </UserContextProvider>
  );
}

export default App;
