import Container from "@/components/Container"
import { Button, Checkbox, Form, Input } from "antd"
import { Fragment } from "react"

const TheSignup = () => {
    return (
        <Fragment>
            <div className="bg-red-500 py-12">

            <Container>
                <div className="w-1/3 p-4 mx-auto bg-white shadow-xl">
                    <Form>
                        <div className="flex justify-between">
                            <Form.Item label="first name">
                                <Input />
                            </Form.Item>
                            <Form.Item label="last name">
                                <Input />
                            </Form.Item>
                            </div>

                            <Form.Item>
                                <Input />
                            </Form.Item>

                            <Form.Item>
                                <Input />
                            </Form.Item>

                            <Form.Item>
                                <Input />
                            </Form.Item>

                            <Form.Item label="I agree to the Terms of use, Cookie policy, Privacy policy">

                                <Checkbox />
                            </Form.Item>

                            <Button type="primary" block>Create accaount</Button>
                    </Form>
                </div>
            </Container>
            </div>
        </Fragment>

    )
}
export default TheSignup