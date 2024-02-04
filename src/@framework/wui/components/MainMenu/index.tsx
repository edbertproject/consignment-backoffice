import React, {useEffect, useState} from "react";
import Menu from "antd/es/menu";
import _ from "lodash";
import {useLocation, useNavigate} from "react-router-dom";
import useAccess from "../../../utilities/hooks/useAccess";
import { haveAccess } from "../../../../functions/global";

const { SubMenu } = Menu;

declare type MenuMode = 'horizontal' | 'vertical' | 'inline';

interface Props {
    menus: any[]
    mode?: MenuMode;
    onChange?: () => void;
}

const WuiMainMenu: React.FC<Props> = ({
    menus,
    mode = "horizontal",
    onChange
}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [rootSubmenuKeys, setRootSubmenuKeys] = useState(['']);
    const [currentMenu, setCurrentMenu] = useState('');
    const [openKeys, setOpenKeys] = React.useState(['']);
    const acl = useAccess();

    useEffect(() => {
        const tempSubMenuKeys = _.map(menus, 'key');
        setRootSubmenuKeys(tempSubMenuKeys)
        setCurrentMenu(location?.pathname)
    }, [menus, location])


    const menuHandleClick = (e: any) => {
        setCurrentMenu(e.key)

        navigate(e.key)

        if (onChange) {
            onChange()
        }
    };

    const onOpenChange = (keys: any) => {
        const latestOpenKey = keys.find((key: any) => openKeys.indexOf(key) === -1);

        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    const getSubmenuAccess = (data: any[]) => {
        let show = false;
        data.forEach((item) => {
            let showSubmenu = false
            if(item.subMenus){
                item.subMenus.forEach((it: any) => {
                    if(haveAccess(acl, it.access) && !showSubmenu){
                        showSubmenu = true
                    }
                })
            } else {
                if(haveAccess(acl, item.access) && !show){
                    show = true
                }
            }

            if(showSubmenu){
                show = true
            }
        })

        return show
    }

    return (
        <Menu
            mode={mode}
            onClick={menuHandleClick}
            selectedKeys={[currentMenu]}
            onOpenChange={onOpenChange}
            openKeys={openKeys}
            className={'main-menu-component'}
        >
            {
                menus.map((item) => {
                    if (item?.subMenus) {
                        return (
                            (
                                getSubmenuAccess(item.subMenus) ? 
                                <SubMenu key={`/${item.key}`} title={item.title} icon={item.icon} popupClassName="dropdown-main-menu">
                                {
                                    item.subMenus.map((sub: any) => {
                                       if (sub?.subMenus) {
                                           return (
                                               getSubmenuAccess(sub.subMenus) ?
                                               <SubMenu key={`/${item.key}/${sub.key}`} title={sub.title}>
                                                   {
                                                       sub.subMenus.map((subSub: any) => {
                                                            return (
                                                                haveAccess(acl, subSub.access) ? <Menu.Item className="dropdown-main-menu-item" key={`/${item.key}/${sub.key}/${subSub.key}`}>{subSub.title}</Menu.Item> : 
                                                                null
                                                            )
                                                       })
                                                   }
                                               </SubMenu> : null
                                           )
                                       } else {
                                            return (
                                                haveAccess(acl, sub.access) ?
                                                    <Menu.Item className="dropdown-main-menu-item" key={`/${item.key}/${sub.key}`}>{sub.title}</Menu.Item>
                                                : null
                                            )
                                       }
                                    })
                                }
                                </SubMenu> 
                                : null
                            )
                            
                        )
                    } else {
                        return (
                            haveAccess(acl, item.access) ? 
                            <Menu.Item key={`/${item.key}`} icon={item.icon}>
                                {item.title}
                            </Menu.Item> : null
                        )
                    }
                })
            }
        </Menu>
    )
}

export default WuiMainMenu
