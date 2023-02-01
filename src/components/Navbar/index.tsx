import Container from "@/components/Container"
import logoImg from '@/assets/logo.svg'

const Navbar = () => {
    return (
        <nav className='py-4 shadow'>
            <Container>
                <div className="flex">
                    <img className='h-12' src={logoImg} alt="" />
                </div>
            </Container>
        </nav>
    )
}
export default Navbar