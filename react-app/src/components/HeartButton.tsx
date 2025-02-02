import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useState } from "react";

interface HeartButtonProps {
    onClick: () => void;
}

const HeartButton = ({ onClick }: HeartButtonProps) => {
    
    const [clickState, setClickState] = useState(false);

    const toggle = () => {
        setClickState(!clickState);
        onClick();
    }

    return( 
        <>
            {clickState ? <MdFavorite color="red" size="100" onClick={toggle} /> : <MdFavoriteBorder color="black" size="100" onClick={toggle} />}
        </>);
}

export default HeartButton;