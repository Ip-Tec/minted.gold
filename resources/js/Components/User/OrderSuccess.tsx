import React from "react";
import { Order } from "@/types/types";

interface OrderSuccessProps {
    order: Order;
}

const OrderSuccess: React.FC<OrderSuccessProps> = ({ order }) => {
    return (
        <div>
            <h1>Order Successful!</h1>
            <p>
                Your order for {order.product.name} has been placed
                successfully.
            </p>
            <p>A confirmation email has been sent to you.</p>
        </div>
    );
};

export default OrderSuccess;
