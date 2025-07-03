import FooterAdmin from "../components/Footers/FooterAdmin";
import AdminNavbar from "../components/Navbars/AdminNavbar";
import StatsNavbar from "../components/Navbars/StatsNavbar";
import StatsSidebar from "../components/Sidebar/StatsSidebar";
import StatsDashboard from "./StatsDashboard";

const StatsPage = () => {
    return (
        <>
            <StatsSidebar />
            <div className="relative pt-10 bg-neutral-100 md:ml-64">
                <StatsNavbar />
                <div className="w-full px-0 mx-auto md:px-10">
                    <StatsDashboard />
                    <FooterAdmin />
                </div>
            </div>
        </>
    );
}

export default StatsPage;