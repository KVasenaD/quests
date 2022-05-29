import './App.css';
import Menu from './components/Menu/Menu';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Menu />
      <div className="wrapper">
        <div className="content">
          <Content />
        </div>
        <Footer />
      </div>
    </div>
  );
}
export default App;
