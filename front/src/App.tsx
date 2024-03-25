import Frame from '@/components/commons/Frame';
import Route from '@/pages/Route';
import '@/styles/Colors.css';
import '@/styles/ETC.css';
import '@/styles/Typography.css';
import { RecoilRoot } from 'recoil';

function App() {


  return (
    <RecoilRoot>
      <Route />
      <Frame />
    </RecoilRoot>
  );
}

export default App;
