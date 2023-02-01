import Button from "@/components/Button"
import Container from "@/components/Container"
import CounterIcon from "./components/CounterIcon"
const Counter = () => {
    const onclicker = () => {
        console.log('fsdfsfsdfsdfsdf')
    }
    return (
        <section className="py-12">
            <Container>
                <div className="flex flex-col gap-y-4 items-center">
                    <div className="text-center">
                        <CounterIcon iconName={'ph:chart-line-up-fill'} refreshData={onclicker} />
                        <div className="text-primary-700 text-2xl font-medium">3429 USD</div>
                        <div>btc price</div>
                    </div>
                    <div className="text-center">
                        <CounterIcon iconName={'ic:baseline-access-time'} refreshData={onclicker} />
                        <div className="text-primary-700 text-2xl font-medium">3429 USD</div>
                        <div>btc price</div>
                    </div>
                    <div className="text-center">
                        <CounterIcon iconName={'clarity:users-solid'} refreshData={onclicker} />
                        <div className="text-primary-700 text-2xl font-medium">3429 USD</div>
                        <div>btc price</div>
                    </div>
                </div>
            </Container>
        </section>
    )
}
export default Counter