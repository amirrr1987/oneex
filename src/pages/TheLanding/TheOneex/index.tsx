import { Button, Input, Form } from "antd"
import Container from "@/components/Container"

const LOneex = () => {
    return (
        <section className=':uno: py-12'>
            <Container>
                <div className=":uno: ">
                    <div className=':uno: text-[#154576] text-uppercase font-medium text-3xl text-center mb-4'>
                        ONEEX
                        EXCHANGE OF TOMORROW
                    </div>
                    <div className=":uno: text-center mb-8">
                        oneex is licened trading platform to cryptocurrencies & assets, built on vanguard security infrastructure and revolutionary reward system
                    </div>
                    <div className="">
                        <Form className=":uno: flex flex-col gap-y-0 md:flex-row md:gap-x-4">
                            <Form.Item className=":uno: mb-4 md:flex-1">
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