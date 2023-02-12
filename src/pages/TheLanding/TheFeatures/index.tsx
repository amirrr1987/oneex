import Container from "@/components/Container"
import { Fragment } from "react"
import CardItem from "./components/CardItem"
import img01 from './assets/images/features-eec-api.png'
import img02 from './assets/images/features-official-lisenses.png'
import img03 from './assets/images/features-trade-mining.png'
import img04 from './assets/images/lowest-fees.svg'
import img05 from './assets/images/loyality-program.svg'
import img06 from './assets/images/media-object.svg'
const Features = () => {
    return (
        <section className="py-12 bg-primary-50">
            <Container>
                <div className="text-center font-bold text-xl text-primary-900 mb-4 md:mb-12">OUR FEATURES AND BENEFITS</div>
                <div className="grid gap-8 md:grid-cols-3">
                    <CardItem img={img01} title="official licenses" caption="oneex acquired all the necessary official licenses for providing exchange servicesto make your trades safe and confident." />
                    <CardItem img={img02} title="ECC API" caption="
                                    unlike other exchanges, we dont store API secrets. By utilizing EdDSA we store only
                                    the
                                    public key, which makes our platform as secure as it phyically can be. Cras sit amet
                                    nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. " />
                    <CardItem img={img03} title="trade mining" caption="
                                    we award CDX tikens to our users simply for trading on CODEX. 1,000,000 CDX tikens
                                    are
                                    proportinally distributed to all traders every day. " />
                    <CardItem img={img04} title="lowest fees" caption="Enjoy trading without thinking about overpriced commissions - we provide 0% fee for deposit and up to 0.05% maker\traker trading fee." />
                    <CardItem img={img05} title="loyality program" caption="trade, keep your CDX tikens and get daily bounties. CDX holders are able to receive bounty in a form of various cryptocurrencies every day." />
                    <CardItem img={img06} title="Media object" caption="Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin." />
                </div>
            </Container>
        </section>
    )
}
export default Features