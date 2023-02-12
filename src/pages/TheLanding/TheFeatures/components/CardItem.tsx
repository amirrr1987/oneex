interface Props {
    img: string
    title: string;
    caption: string;
}

const CardItem = (props: Props) => {
    return (
        <div className="flex flex-col items-center gap-y-4">
            <img className="w-1/3 md:w-1/5" src={props.img} alt="" />
            <div className="text-center">
                <div className="text-xl font-medium leading-6 lowercase capitalize">{props.title}</div>
                <p className="text-sm font-normal leading-6">
                    {props.caption}
                </p>
            </div>
        </div>
    )
}
export default CardItem