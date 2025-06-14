import FooterAdmin from "../components/Footers/FooterAdmin";
import AdminNavbar from "../components/Navbars/AdminNavbar";
import StatsSidebar from "../components/Sidebar/StatsSidebar";
import StatsDashboard from "./StatsDashboard";

const StatsPage = () => {
    return (
        <>
            <StatsSidebar />
            <div className="relative bg-neutral-100 md:ml-64">
                <AdminNavbar />
                <div className="w-full px-0 mx-auto md:px-10">
                    <StatsDashboard />
                    <FooterAdmin />
                </div>
            </div>
        </>
    );
}

export default StatsPage;