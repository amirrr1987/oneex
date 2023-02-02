import { useState, createContext } from "react";
// import { GetPostsApi, GetPagesApi } from "../services";

const ListContext = createContext<any | null>(null);

export function ListContextProvider(props: any) {
    const [posts, setPosts] = useState<any>([]);
    const getPosts = async () => {
        try {
            // const { data }: any = await GetPostsApi();
            // setPosts(data);
        } catch (error) {
            console.log(error);
        }
    };

    const [pages, setPages] = useState<any>([]);
    const getPages = async () => {
        try {
            // const { data }: any = await GetPagesApi();
            // setPages(data);
        } catch (error) {
            console.log(error);
        }
    };

    const dataContext = {
        posts,
        getPosts,
        pages,
        getPages,
    };

    return (
        <ListContext.Provider value={dataContext}>
            {props.children}
        </ListContext.Provider>
    );
}

export default ListContext;
