import { ConfigProvider } from 'antd';

import LandingPage from '@/pages/LandingPage'

const App = (): JSX.Element => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#6b89ca',
        },
      }}
    >
      <LandingPage />
   
    </ConfigProvider>
  )
};
export default App