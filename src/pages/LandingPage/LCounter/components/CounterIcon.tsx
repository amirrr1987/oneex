import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';

const CounterIcon = (props: any) => {
    const [toggleClass, setToggleClass] = useState('')

    const refreshData = () => {
        props.refreshData()
        setToggleClass('animate-duration rotate-90')
    }
    return (
        <div className="bg-[#f3f3f3] rounded-full p-4 relative">
            <div className=" border-4 border-solid border-primary rounded-full p-4 bg-[#f3f3f3]">
                <div className="bg-primary text-white text-5xl p-4 rounded-full">
                    <Icon className="text-5xl bg-primary" icon={props.iconName} />
                </div>
            </div>
            <button onClick={refreshData} className={`absolute bg-[#f3f3f3] text-secondary text-xl p-1 rounded-full right-2 bottom-2 ${toggleClass}`}>
                <Icon icon="material-symbols:refresh" />
            </button>
        </div>
    )
}


export default CounterIcon
