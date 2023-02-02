import Container from "@/components/Container"
import logoImg from '@/assets/logo.svg'
import { Button } from "antd"

const TheNavbar = () => {
    return (
        <nav className='py-4 shadow'>
            <Container>
                <div className="flex items-center justify-between">
                    <img className='h-12' src={logoImg} alt="" />
                    <Button type="secondary" className="">
                        get oneex token free
                    </Button>
                </div>
            </Container>
        </nav>
    )
}
export default TheNavbar