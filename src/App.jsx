import { useState } from "react";
import "./styles/app.css";
import Welcome from "./components/welcome";
import Story from "./components/story";
import BackgroundMusic from "./components/BackgroundMusic";
import CountdownScreen from "./components/CountdownScreen";

function App() {
  const [step, setStep] = useState("welcome");

  return (
    <>
      <BackgroundMusic />
      {step === "welcome" ? (
        <Welcome onStart={() => setStep("countdown")} />
      ) : step === "countdown" ? (
        <CountdownScreen onComplete={() => setStep("story")} />
      ) : step === "story" ? (
        <Story onBack={() => setStep("welcome")} />
      ) : null}
    </>
  );
}

export default App;