interface CartProps {
    cartItems: string[];
}

const Cart = ({cartItems}: CartProps) => {
    return (
        <div>
            <h1>{cartItems.map((item) => 
                <p key={item}>{item}</p>
            )}</h1>
        </div>
    );
}

export default Cart;