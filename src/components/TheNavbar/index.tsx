import Container from "@/components/Container"
import logoImg from '@/assets/logo.svg'
import { Button } from "antd"

const TheNavbar = () => {
    return (
        <nav className='py-4 shadow'>
            <Container>
                <div className="flex items-center justify-between gap-x-4">
                    <img className='h-auto w-24' src={logoImg} alt="" />
                    <Button type="primary">
                        Get free token
                    </Button>

                </div>
            </Container>
        </nav>
    )
}
export default TheNavbar