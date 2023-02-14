import { Button, Input, Form } from "antd"
import Container from "@/components/Container"
import { NavLink } from "react-router-dom"

const TheDashboard = () => {
    return (
        <>
            <nav className=":uno: py-4 shadow">
                <Container full>
                    <div className=":uno: flex justify-between">
                        <div className=":uno: flex gap-x-4 items-center">
                            <NavLink to="/">logo</NavLink>
                            <ul className=":uno: flex gap-x-4 mb-0">
                                <NavLink to="/exchange" className=":uno: decoration-none text-primary-900">exchange</NavLink>
                                <NavLink to="/exchange" className=":uno: decoration-none text-primary-900">exchange</NavLink>
                                <NavLink to="/exchange" className=":uno: decoration-none text-primary-900">exchange</NavLink>
                                <NavLink to="/exchange" className=":uno: decoration-none text-primary-900">exchange</NavLink>
                            </ul>

                        </div>
                        <div className="">
                            <Button type="primary">
                                Get free token
                            </Button>
                        </div>
                    </div>
                </Container>
            </nav>
            <section className=':uno: py-12'>
                <Container full>
                    <div className=":uno: ">
                        <div className='text-[#154576] text-uppercase font-medium text-3xl text-center'>
                            ONEEX
                            EXCHANGE OF TOMORROW
                        </div>
                        <div className=":uno: text-center">
                            oneex is licened trading platform to cryptocurrencies & assets, built on vanguard security infrastructure and revolutionary reward system
                        </div>
                        <div className=":uno:">
                            <Form className=":uno: flex flex-col gap-y-0">
                                <Form.Item className=":uno: flex-1 mb-4">
                                    <Input type="text" />
                                </Form.Item>
                                <Button type="primary" className=":uno: bg-accent"> Create account</Button>
                            </Form>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    )
}
export default TheDashboard