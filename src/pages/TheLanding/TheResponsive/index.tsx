import Container from "@/components/Container"
import img from './assets/images/tls-screen-min.png'
const TheResponsive = () => {
    return (
        <section className="py-12">
            <Container>
                <img className="w-full md:w-2/5 md:mx-auto md:block mb-8" src={img} alt="" />
                <div className="capitalize text-center text-xl font-semibold text-primary-900"> customize your interface</div>
                <p className="text-center text-sm leading-6 font-medium">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt excepturi veniam veritatis provident dicta, incidunt neque, voluptatibus consectetur impedit ullam perferendis sapiente nisi quia nam placeat odit similique pariatur. Blanditiis?
                </p>
            </Container>
        </section>
    )
}
export default TheResponsive