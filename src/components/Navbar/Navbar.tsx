import {useState} from 'react';
import s from './Navbar.module.scss'
import {useNavigate} from "react-router-dom";

export const Navbar = (props: NavbarPropsType) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeItem, setActiveItem] = useState<string>("");
    const navigate = useNavigate();

    const {menuItems} = props;

    const onOpenBurgerHandler = () => {
        setIsOpen(!isOpen)
    };

    const handleClick = (item: string) => {
        setActiveItem(item !== activeItem ? item : "");
        navigate(item)
    };

    return (
        <nav className={s.navbar}>
            <button
                onClick={onOpenBurgerHandler}
                className={`${s.burger} ${isOpen && s.openedBurger}`}
            ></button>
            <button className={s.button}
                    style={{color: '#0d0d0e', fontWeight: '700'}}
                    onClick={() => navigate('/')}
            >
                YOUR BRAND
            </button>
            <div className={`${s.navbar_menu} ${isOpen && s.openedDropdowns}`}>
                {menuItems.map((item, index) => <button
                    key={item+index}
                    className={`${s.button} ${activeItem === item && s.activeBtn}`}
                    onClick={() => handleClick(item)}
                >{item.toUpperCase()}</button>)}
            </div>
        </nav>
    );
}

type NavbarPropsType = {
    menuItems: string[];
}