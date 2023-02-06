import Container from "@/components/Container"
import { Icon } from "@iconify/react"

const TheFooter = () => {
    return (
        <footer>
            <div className='bg-[#666] py-12'>
                <Container>
                    <div className="grid gap-4">
                        <ul className="list-none m-0 p-0 text-sm leading-6">
                            <li className=":uno: text-white text-center">About</li>
                            <li className=":uno: text-white text-center">Security</li>
                            <li className=":uno: text-white text-center">Fee Structure</li>
                            <li className=":uno: text-white text-center">API docs</li>
                            <li className=":uno: text-white text-center">Support</li>
                        </ul>
                        <ul className="list-none m-0 p-0 text-sm leading-6">
                            <li className=":uno: text-white text-center">Support</li>
                            <li className=":uno: text-white text-center">Cookie policy</li>
                            <li className=":uno: text-white text-center">Terms of use</li>
                            <li className=":uno: text-white text-center">CDX</li>
                            <li className=":uno: text-white text-center">Blog</li>
                            <li className=":uno: text-white text-center">Privacy</li>
                        </ul>
                        <address className="text-white text-center font-normal text-sm ">
                            #88, No. 55, Alley Alley, Avenue Ave, Tehran, Iran - P.O.Box 12345-67890
                        </address>
                        <div className="text-white text-center">+982188776655</div>
                        <div className="text-white text-center">support@oneex.com</div>
                    </div>
                </Container>
            </div>
            <div className="py-12">
                <Container>
                    <div className="flex justify-center gap-x-4">
                        <a href="" className="text-4xl bg-secondary text-white w-12 h-12 p-2 flex items-center justify-center rounded-xl">
                            <Icon icon="cib:whatsapp" />
                        </a>
                        <a href="" className="text-4xl bg-secondary text-white w-12 h-12 p-2 flex items-center justify-center rounded-xl">
                            <Icon icon="cib:telegram" />
                        </a>
                        <a href="" className="text-4xl bg-secondary text-white w-12 h-12 p-2 flex items-center justify-center rounded-xl">
                            <Icon icon="cib:instagram" />
                        </a>
                    </div>
                </Container>
            </div>
            <div className="text-center font-light text-xs py-4 bg-[#313131] text-light">
                <span>©Copyright 2018. oneex. All Rights Resevd</span>
            </div>
        </footer>
    )
}
export default TheFooter