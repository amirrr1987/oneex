import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { Button} from "antd";

const CounterIcon = (props: any) => {
    const [toggleClass, setToggleClass] = useState('')

    const refreshData = () => {
        props.refreshData()
        setToggleClass('animate-duration rotate-90')
    }
    return (
        <div className=":uno: bg-[#f3f3f3] rounded-full p-4 relative">
            <div className=":uno: border-4 border-solid border-primary-700 rounded-full p-4 bg-[#f3f3f3] w-32 h-32">
                <div className=":uno: text-5xl flex justify-center items-center bg-primary-700 text-white w-full h-full rounded-full">
                    <Icon className=":uno: " icon={props.iconName} />
                </div>
            </div>
            <Button onClick={refreshData} type="default" shape='circle' className=':uno: bg-light-4 absolute right-4 bottom-4' icon={
                <Icon className=':uno: text-secondary' fontSize={24} icon="material-symbols:refresh" />
            }> 
            </Button>
        </div>
    )
}


export default CounterIcon
