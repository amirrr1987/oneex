import TheFooter from "@/components/TheFooter";
import Navbar from "@/components/TheNavbar";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";

const TheAuth = () => {
    return (
        <main>
            <Navbar />
            <Outlet />
            <TheFooter />
        </main>
    )
}
export default TheAuth