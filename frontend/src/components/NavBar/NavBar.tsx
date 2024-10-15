
import donut_image from "./../../../assets/donut.svg";
import "./NavBar.css";

const NavBar = () =>
{
    return (
        <>
            <div className="nav flex-center-row">
                <img src={donut_image} height={48} />
                <span className="page-title">K's List</span>
            </div>
        </>
    )
};

export default NavBar;