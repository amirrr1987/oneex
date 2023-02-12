const Container = (props: any) => {
    return (
        <div className={props.full ? ' mx-auto px-4' : 'container mx-auto px-4'}>
            {props.children}
        </div>
    )
 }

export default Container