interface NavBarProps {
    cartItemCount: number;
}

const NavBar = ({ cartItemCount }: NavBarProps) => {
    return <div>NavBar: {cartItemCount}</div>;
};

export default NavBar;