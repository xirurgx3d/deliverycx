import { FC, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import HeaderBack from "../../components/HOC/HeaderBack";
import CartChoise from "./CartChoice";
import CartWrapper from "./CartWrapper";

import { DeliveryForm, DeliveryMemo } from "./delivery";
import { OnSpotForm, OnSpotMemo } from "./onspot";
import { PickupForm, PickupMemo } from "./pickup";

import { RootState } from "../../store";
import { CART_CHOICE } from "../../types/actions/cart";
import { useHistory } from "react-router";


const Cart: FC = () => {
    const history = useHistory();
    const {cart_choice, list} = useSelector((state: RootState) => state.cart);
    const [CartWrapperProps, setCartWrapperProps] = useState({
        Memo: DeliveryMemo,
        Form: DeliveryForm
    });

    useEffect(() => {
        switch (cart_choice) {
            case CART_CHOICE.DELIVERY: {
                setCartWrapperProps({
                    ...{
                        Memo: DeliveryMemo,
                        Form: DeliveryForm
                    }
                })
                break;
            }
            case CART_CHOICE.ONSPOT: {
                setCartWrapperProps({
                    ...{
                        Memo: OnSpotMemo,
                        Form: OnSpotForm
                    }
                })
                break;
            }
            case CART_CHOICE.PICKUP: {
                setCartWrapperProps({
                    ...{
                        Memo: PickupMemo,
                        Form: PickupForm
                    }
                })
                break;
            }
        }
    }, [cart_choice]);

    return (
        <div className="app" style={{ backgroundColor: "#fff" }}>
            <div className="cart">
                <HeaderBack onClickCb={()=>history.push("/shop")}>
                        Ваш заказ <span className="select-red">{list.length}</span> блюд
                </HeaderBack>
                <div className="container">
                    <CartChoise />
                </div>
                <CartWrapper {...CartWrapperProps} />

            </div>
        </div>
    );
}

export default Cart;