import SvgComponent from "./SvgComponent";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="app" >
      <SvgComponent />
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
