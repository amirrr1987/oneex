interface Props {
    img: string
    title: string;
    caption: string;
}

const CardItem = (props: Props) => {
    return (
        <div className="">
            <img src={props.img} alt="" />
            <div className="">
                <div className="">{props.title}</div>
                <p>
                    {props.caption}
                </p>
            </div>
        </div>
    )
}
export default CardItem