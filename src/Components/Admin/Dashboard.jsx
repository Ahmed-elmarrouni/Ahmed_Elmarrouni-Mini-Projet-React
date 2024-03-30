import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

function Dashboard() {

    return (
        <>
            <div className="flex">
                <SideBar />
                <Outlet />
            </div>

        </>
    );
}

export default Dashboard;

