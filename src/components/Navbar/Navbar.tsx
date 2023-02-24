import React, {useState} from 'react';
import s from './Navbar.module.scss'
import {useNavigate} from "react-router-dom";

export const Navbar = React.memo((props: NavbarPropsType) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeItem, setActiveItem] = useState<string>("");
    const navigate = useNavigate();

    const {menuItems} = props;

    const onOpenBurgerHandler = () => {
        setIsOpen(!isOpen)
    };

    const handleClick = (item: string) => {
        setActiveItem(item !== activeItem ? item : "");
        setIsOpen(false)
        navigate(item)
    };

    return (
        <nav className={s.navbar}>
            <button
                onClick={onOpenBurgerHandler}
                className={`${s.burger} ${isOpen && s.openedBurger}`}
            ></button>
            <button className={s.button}
                    style={{color: '#0d0d0e', fontWeight: '700', fontSize: '24px'}}
                    onClick={() => navigate('/')}
            >
                YOUR BRAND
            </button>
            <div className={`${s.navbar_menu} ${isOpen && s.openedDropdowns}`}>
                {menuItems.map((item, index) => <button
                    key={item.group+index}
                    className={`${s.button} ${activeItem === item.group && s.activeBtn}`}
                    onClick={() => handleClick(item.group)}
                >{item.name}</button>)}
            </div>
        </nav>
    );
})

type NavbarPropsType = {
    menuItems: Array<{group: string, name: string}>;
}