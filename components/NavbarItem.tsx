import React from "react";
interface NavbarItemProps {
  label: string; //component expect label with type string
}
const NavbarItem: React.FC<NavbarItemProps> = ({ label }) => {
  //it is a (React.FC) React functional component which take prop types of NavbarItemProps it destuructures label prop from prop object
  //by desturucturing i dont have to write it as props.label but can be directly written as label instead
  return (
    <div className="text-white cursor-pointer hover:text-gray-300 transition">
      {label}
    </div>
  );
};

export default NavbarItem;
