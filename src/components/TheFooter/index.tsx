import Container from "@/components/Container"

const TheFooter = () => {
    return (
        <footer className='bg-[#666] py-12'>
            <Container>
                <div className="text-center grid gap-4">
                    <ul>
                        <li className=":uno: text-white">About</li>
                        <li className=":uno: text-white">Security</li>
                        <li className=":uno: text-white">Fee Structure</li>
                        <li className=":uno: text-white">API docs</li>
                        <li className=":uno: text-white">Support</li>
                    </ul>
                    <ul>

                        <li className=":uno: text-white">Support</li>
                        <li className=":uno: text-white">Cookie policy</li>
                        <li className=":uno: text-white">Terms of use</li>
                        <li className=":uno: text-white">CDX</li>
                        <li className=":uno: text-white">Blog</li>
                        <li className=":uno: text-white">Privacy</li>
                    </ul>
                    <address className="text-white text-center">
                        #88, No. 55, Alley Alley, Avenue Ave, Tehran, Iran - P.O.Box 12345-67890
                    </address>
                    <div className="text-white text-center">+982188776655</div>
                    <div className="text-white text-center">support@oneex.com</div>
                </div>
            </Container>
        </footer>
    )
}
export default TheFooter