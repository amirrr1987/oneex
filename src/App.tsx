import { Fragment, useState } from 'react'
import Button from '@/components/Button';
import Container from '@/components/Container';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import GetToken from '@/modules/GetToken';

const App = (): JSX.Element => {
  const [count, setCount] = useState(0)

  return (
    <Fragment>

      <Navbar />

      <main>
        <section className='py-12'>
          <Container>
            <div className="">
              <div className='text-[#154576] text-uppercase font-medium text-3xl text-center'>
                ONEEX
                EXCHANGE OF TOMORROW
              </div>
              <div className="text-center">
                oneex is licened trading platform to cryptocurrencies & assets, built on vanguard security infrastructure and revolutionary reward system
              </div>
              <div className="">
                <input type="text" />
                <Button className="bg-red-500">
                  Create account
                </Button>
              </div>
            </div>
          </Container>
        </section>
        <GetToken />
      </main>

      <Footer />

    </Fragment>
  )
};

export default App
