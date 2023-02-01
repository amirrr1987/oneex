import Button from "@/components/Button"
import Container from "@/components/Container"
const GetToken = (props: any) => {
    return (
        <section className="bg-[#6a89cc] py-12">
            <Container>
                <div className="flex flex-col  gap-y-4 text-white">
                    <div className="text-center text-3xl font-bold capitalize">
                        tic token
                    </div>
                    <div className="text-center">
                        oneex has created a TIC token with the gobal of stimulating the growth of the platform,
                        serving and supporting its users. spark the action and reward our users of loyalty.
                    </div>
                    <ul className="list-circle pl-8">
                        <li>Earn CDX by trading on CODX</li>
                        <li>Hold CDX tokens to receive the bounties and bounuses</li>
                        <li>Get 50% off your trading fees, when paying in CDX</li>
                        <li>Get more cashback from invited users.</li>
                    </ul>
                    <div className="self-center">
                        <Button>
                            Get TIC Token
                        </Button>
                    </div>
                </div>
            </Container>
        </section>
    )
}
export default GetToken