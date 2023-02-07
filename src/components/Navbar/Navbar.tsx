import {useState} from 'react';
import s from './Navbar.module.scss'

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeItem, setActiveItem] = useState<string>("");

    const onOpenBurgerHandler = () => {
        setIsOpen(!isOpen)
    };

    const menuItems = ['tops', 'bottoms', 'dresses', 'accessories', 'shoes'];

    const handleClick = (item: string) => {
        setActiveItem(item !== activeItem ? item : "");
        // navigate(item)
    };

    return (
        <nav className={s.navbar}>
            <button onClick={onOpenBurgerHandler} className={`${s.burger} ${isOpen && s.openedBurger}`}></button>
            <button className={s.button}>HOME</button>
            <div className={`${s.navbar_menu} ${isOpen && s.openedDropdowns}`}>
                {menuItems.map(i => <button
                    key={i}
                    className={`${s.button} ${activeItem === i && s.activeBtn}`}
                    onClick={() => handleClick(i)}
                >{i.toUpperCase()}</button>)}
            </div>
        </nav>
    );
}