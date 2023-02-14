interface Props {
    img: string
    title: string;
    caption: string;
}

const CardItem = (props: Props) => {
    return (
        <div className=":uno: flex flex-col items-center gap-y-4">
            <img className=":uno: w-1/3 md:w-1/5" src={props.img} alt="" />
            <div className=":uno: text-center">
                <div className=":uno: text-xl font-medium leading-6 lowercase capitalize">{props.title}</div>
                <p className=":uno: text-sm font-normal leading-6">
                    {props.caption}
                </p>
            </div>
        </div>
    )
}
export default CardItem