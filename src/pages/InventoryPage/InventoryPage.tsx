import {InventoryItem} from "../../components/InventoryItem/InventoryItem";
import {ItemType, RulesType} from "../../api/inventoryAPI";
import {useAppDispatch} from "../../utils/utils";
import s from "./InventoryPage.module.scss"
import {appdataActions, appdataSelectors} from "../../app/appdataReducer";
import {useSelector} from "react-redux";
import {CurrentItemType} from "../../app/appdataReducer/appdataReducer";
import {useCallback} from "react";

export const InventoryPage = (props: InventoryPagePropsType) => {
    const {inventory, rules} = props;
    const dispatch = useAppDispatch();

    const {selectCurrItems, selectCurrModel} = appdataSelectors;
    const currItems = useSelector(selectCurrItems);

    const currModel = useSelector(selectCurrModel);
    const {setCurrItem, setCurrModelType} = appdataActions;

    const merge_items = useCallback((prev_items: Array<CurrentItemType>, new_items: Array<CurrentItemType> = []) => {
        let grouped = {};
        const order = Object.fromEntries(rules.order?.map((group, i) => [group, i]));

        for (let item of prev_items) {
            // @ts-ignore
            grouped[item.group] = item;
        }
        for (let item of new_items) {
            // @ts-ignore
            let excluded = rules.exclusion[item.group];
            if (excluded) {
                for (let group of excluded) {
                    // @ts-ignore
                    delete grouped[group];
                }
            }
            // @ts-ignore
            grouped[item.group] = item;
        }
        // @ts-ignore
        let model: 'nude' | 'covered' = rules.nude.some(v => v.every(g => grouped[g])) ? 'nude' : 'covered';
        let items = Object.values(grouped).sort((a, b) => {
            // @ts-ignore
            return order[a.group] - order[b.group];
        });
        return {items, model};
    }, [rules]);

    const onSidebarOpen = () => {
        const mouseClickEvents = ['mousedown', 'click', 'mouseup'];
        const element = document.querySelector('#SideBar_Tab');
        mouseClickEvents.forEach(mouseEventType =>
            element?.dispatchEvent(
                new MouseEvent(mouseEventType, {
                    view: window,
                    bubbles: true,
                    cancelable: true,
                    buttons: 1
                })
            )
        );
    };

    const onItemClick = useCallback((item: ItemType) => {
        const {items, model} = merge_items(currItems, [item]);
        dispatch(setCurrItem(items));
        dispatch(setCurrModelType({type: model}));
        onSidebarOpen();
        // @ts-ignore
        currModel.isCustom && window['fitpic'].setItem(item.id);
    }, [currItems, currModel.isCustom, dispatch, merge_items, setCurrItem, setCurrModelType]);

    return (
        <div className={s.InventoryPage}>
            {inventory.map(item => {
                return <InventoryItem
                    key={item.id}
                    onItemClick={onItemClick}
                    item={item}
                />
            })}
        </div>
    );
};

type InventoryPagePropsType = {
    inventory: Array<ItemType>;
    rules: RulesType
}