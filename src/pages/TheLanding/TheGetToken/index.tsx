import { Button } from "antd"
import Container from "@/components/Container"
const GetToken = (props: any) => {
    return (
        <section className=":uno: bg-primary-500 py-12">
            <Container>
                <div className=":uno: flex flex-col  gap-y-4 text-white">
                    <div className=":uno: text-center text-3xl font-bold">
                        TIC Token
                    </div>
                    <div className=":uno: text-center text-base font-light leading-7">
                        oneex has created a TIC token with the gobal of stimulating the growth of the platform,
                        serving and supporting its users. spark the action and reward our users of loyalty.
                    </div>
                    <ul className=":uno: list-circle pl-8 leading-9 text-base font-normal leading-6">
                        <li>Earn CDX by trading on CODX</li>
                        <li>Hold CDX tokens to receive the bounties and bounuses</li>
                        <li>Get 50% off your trading fees, when paying in CDX</li>
                        <li>Get more cashback from invited users.</li>
                    </ul>
                    <div className=":uno: self-center">
                        <Button type="default">
                            Get TIC Token
                        </Button>
                    </div>
                </div>
            </Container>
        </section>
    )
}
export default GetToken