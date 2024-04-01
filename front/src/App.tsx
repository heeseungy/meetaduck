import Frame from '@/components/commons/Frame';
import Router from '@/pages/Status/Router';
import '@/styles/Colors.css';
import '@/styles/ETC.css';
import '@/styles/Typography.css';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <Router />
      <Frame />
    </RecoilRoot>
  );
}

export default App;
