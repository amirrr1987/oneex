import Container from "@/components/Container"
import { Icon } from "@iconify/react"
import CounterIcon from "./components/CounterIcon"
const Counter = () => {
    const onclicker = (event:any) => {
        console.log(event)
    }
    return (
        <section className="py-12">
            <Container>
                <div className=":uno: flex flex-col gap-y-8 md:flex-row md:justify-between md:w-3/4 mx-auto items-center">
                    <div className="text-center">
                        <CounterIcon iconName={'ph:chart-line-up-fill'} refreshData={onclicker} />
                        <div className=":uno: text-primary-600 text-2xl font-medium mb-2">3429 USD</div>
                        <div>btc price</div>
                    </div>
                    <Icon className=":uno: text-4xl text-primary-700" icon="ic:round-menu" rotate={90} />
                    <div className="text-center">
                        <CounterIcon iconName={'ic:baseline-access-time'} refreshData={onclicker} />
                        <div className=":uno: text-primary-600 text-2xl font-medium mb-2">2992</div>
                        <div>actice users</div>
                    </div>
                    <Icon className=":uno: text-4xl text-primary-700" icon="ic:round-menu" rotate={90} />
                    <div className="text-center">
                        <CounterIcon iconName={'clarity:users-solid'} refreshData={onclicker} />
                        <div className=":uno: text-primary-600 text-2xl font-medium mb-2">151 BTC</div>
                        <div>24 volume</div>
                    </div>
                </div>
            </Container>
        </section>
    )
}
export default Counter
