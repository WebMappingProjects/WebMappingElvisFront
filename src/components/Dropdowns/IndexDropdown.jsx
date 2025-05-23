import { Link } from "react-router-dom";
import { createPopper } from "@popperjs/core";
import { createRef, useState } from "react";

const IndexDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = createRef();
  const popoverDropdownRef = createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <a
        className="flex items-center px-3 py-4 text-xs font-bold uppercase hover:text-blueGray-500 text-blueGray-700 lg:py-2"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        Demo Pages
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <span
          className={
            "text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
          }
        >
          Admin Layout
        </span>
        <Link
          to="/admin/dashboard"
          className="block w-full px-4 py-2 text-sm font-normal bg-transparent whitespace-nowrap text-blueGray-700"
        >
          Dashboard
        </Link>
        <Link
          to="/admin/settings"
          className="block w-full px-4 py-2 text-sm font-normal bg-transparent whitespace-nowrap text-blueGray-700"
        >
          Settings
        </Link>
        <Link
          to="/admin/tables"
          className="block w-full px-4 py-2 text-sm font-normal bg-transparent whitespace-nowrap text-blueGray-700"
        >
          Tables
        </Link>
        <Link
          to="/admin/maps"
          className="block w-full px-4 py-2 text-sm font-normal bg-transparent whitespace-nowrap text-blueGray-700"
        >
          Maps
        </Link>
        <div className="h-0 mx-4 my-2 border border-solid border-blueGray-100" />
        <span
          className={
            "text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
          }
        >
          Auth Layout
        </span>
        <Link
          to="/auth/login"
          className="block w-full px-4 py-2 text-sm font-normal bg-transparent whitespace-nowrap text-blueGray-700"
        >
          Login
        </Link>
        <Link
          to="/auth/register"
          className="block w-full px-4 py-2 text-sm font-normal bg-transparent whitespace-nowrap text-blueGray-700"
        >
          Register
        </Link>
        <div className="h-0 mx-4 my-2 border border-solid border-blueGray-100" />
        <span
          className={
            "text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
          }
        >
          No Layout
        </span>
        <Link
          to="/landing"
          className="block w-full px-4 py-2 text-sm font-normal bg-transparent whitespace-nowrap text-blueGray-700"
        >
          Landing
        </Link>
        <Link
          to="/profile"
          className="block w-full px-4 py-2 text-sm font-normal bg-transparent whitespace-nowrap text-blueGray-700"
        >
          Profile
        </Link>
      </div>
    </>
  );
};

export default IndexDropdown;
