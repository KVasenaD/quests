import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import AboutQuest from '../AboutQuest/AboutQuest';
import PersonalAccount from '../PersonalAccount/PersonalAccount';
import Auth from '../Auth/Auth';

const Content = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quest/:id" element={<AboutQuest />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/account/:id" element={<PersonalAccount />} />
    </Routes>
  );
};
export default Content;
