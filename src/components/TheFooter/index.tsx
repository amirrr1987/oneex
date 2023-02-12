import Container from "@/components/Container"
import { Icon } from "@iconify/react"

const TheFooter = () => {
    return (
        <footer>
            <div className='bg-[#666] py-12'>
                <Container>
                    <div className=":uno: grid gap-4 md:grid-cols-3 lg:w-1/4 lg:mx-auto">
                        <ul className=":uno: list-none m-0 p-0 text-sm leading-6">
                            <li className=":uno: text-white text-center">About</li>
                            <li className=":uno: text-white text-center">Security</li>
                            <li className=":uno: text-white text-center">Fee Structure</li>
                            <li className=":uno: text-white text-center">API docs</li>
                            <li className=":uno: text-white text-center">Support</li>
                        </ul>
                        <ul className=":uno: hidden md:list-none md:m-0 md:p-0 md:text-sm md:leading-6 md:flex md:flex-col md:gap-y-4 md:items-center">
                            <li className=":uno: text-white text-center">
                                <a href="" className=":uno: text-3xl bg-white text-secondary w-10 h-10 p-2 flex items-center justify-center rounded-xl">
                                    <Icon icon="cib:whatsapp" />
                                </a>
                            </li>
                            <li className=":uno: text-white text-center">
                                <a href="" className=":uno: text-3xl bg-white text-secondary w-10 h-10 p-2 flex items-center justify-center rounded-xl">
                                    <Icon icon="cib:telegram" />
                                </a>
                            </li>
                            <li className=":uno: text-white text-center">
                                <a href="" className=":uno: text-3xl bg-white text-secondary w-10 h-10 p-2 flex items-center justify-center rounded-xl">
                                    <Icon icon="cib:instagram" />
                                </a>
                            </li>
                        </ul>
                        <ul className=":uno: list-none m-0 p-0 text-sm leading-6">
                            <li className=":uno: text-white text-center">Support</li>
                            <li className=":uno: text-white text-center">Cookie policy</li>
                            <li className=":uno: text-white text-center">Terms of use</li>
                            <li className=":uno: text-white text-center">CDX</li>
                            <li className=":uno: text-white text-center">Blog</li>
                            <li className=":uno: text-white text-center">Privacy</li>
                        </ul>
                        <address className=":uno: text-white text-center font-normal text-sm md:col-span-3">
                            #88, No. 55, Alley Alley, Avenue Ave, Tehran, Iran - P.O.Box 12345-67890
                        </address>
                        <div className=":uno: text-white text-center md:col-span-3">+982188776655</div>
                        <div className=":uno: text-white text-center md:col-span-3">support@oneex.com</div>
                    </div>
                </Container>
            </div>
            <div className="py-12 md:hidden">
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