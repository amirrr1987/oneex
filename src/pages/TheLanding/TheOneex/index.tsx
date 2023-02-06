import { Button, Input, Form } from "antd"
import Container from "@/components/Container"

const LOneex = () => {
    return (
        <section className='py-12'>
            <Container>
                <div className="">
                    <div className='text-[#154576] text-uppercase font-medium text-3xl text-center mb-4'>
                        ONEEX
                        EXCHANGE OF TOMORROW
                    </div>
                    <div className="text-center mb-8">
                        oneex is licened trading platform to cryptocurrencies & assets, built on vanguard security infrastructure and revolutionary reward system
                    </div>
                    <div className="">
                        <Form className="flex flex-col gap-y-0">
                            <Form.Item className="mb-4">
                                <Input type="text" />
                            </Form.Item>
                            <Button type="primary"> Create account</Button>
                        </Form>
                    </div>
                </div>
            </Container>
        </section>
    )
}
export default LOneex