import { Route } from "wouter";
import { UserContextProvider } from "./config/UserContext";
import NavBar from "./components/NavBar";
import SectionContainer from "./components/SectionContainer";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <UserContextProvider>
      <SectionContainer className="App">
        <NavBar />
        <Route path="*" component={NotFound} />
        <Route path="/" component={HomePage} />
        <Route path="/login" component={Login} />
      </SectionContainer>
    </UserContextProvider>
  );
}

export default App;
