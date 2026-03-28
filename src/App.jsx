import { BrowserRouter, Routes, Route } from "react-router-dom";
import ModeSelection from "./components/ModeSelection.jsx";
import FingerspellMode from "./components/FingerspellMode.jsx";
import BankingMode from "./components/BankingMode.jsx";
import DepositForm from "./components/DepositForm.jsx";
import WithdrawForm from "./components/WithdrawForm.jsx";
import TransferForm from "./components/TransferForm.jsx";
import BalanceScreen from "./components/BalanceScreen.jsx";
import HelpMenu from "./components/HelpMenu.jsx";
import LearnPage from "./pages/LearnPage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import GesturoChat from "./components/GesturoChat.jsx";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<ModeSelection />} />
      <Route path="/fingerspell" element={<FingerspellMode />} />
      <Route path="/banking" element={<BankingMode />} />
      <Route path="/deposit" element={<DepositForm />} />
      <Route path="/withdraw" element={<WithdrawForm />} />
      <Route path="/transfer" element={<TransferForm />} />
      <Route path="/balance" element={<BalanceScreen />} />
      <Route path="/help" element={<HelpMenu />} />
      <Route path="/learn" element={<LearnPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <GesturoChat />
  </BrowserRouter>
);

export default App;
