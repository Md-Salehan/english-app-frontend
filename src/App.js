import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import Main from './Layout/Main';
import DailyVocab from './Pages/dailyVocab/DailyVocab';
import GrammarHub from './Pages/grammarHub/GrammarHub';
import MyAccount from './Pages/myAccount/MyAccount';
import Tools from './Pages/tools/Tools';
import VoiceChat from './Pages/voiceChat/VoiceChat';
import VoiceChat_exp from './Pages/voiceChat/VoiceChat_exp';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' />
        <Route path='/page' element={<Main />}>
          <Route path='dailyvocab' element={<DailyVocab title={""} />} />
          <Route path='grammarhub' element={<GrammarHub />} />
          <Route path='myaccount' element={<MyAccount />} />
          <Route path='tools' element={<Tools />} />
          <Route path='voicechat' element={<VoiceChat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
