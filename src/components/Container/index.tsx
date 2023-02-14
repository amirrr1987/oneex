const Container = (props: any) => {
    return (
        <div className={props.full ? ':uno:  mx-auto px-4' : ':uno: container mx-auto px-4'}>
            {props.children}
        </div>
    )
 }

export default Container