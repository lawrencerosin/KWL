export function showOrHideMenu(current){
    const menu=current.target.nextElementSibling;
    if(menu.style.display=="block")
         menu.style.display="none";
    else
      
        menu.style.display="block";
}
export function hideMenu(event){
    
    event.target.parentElement.style.display="none";
}
export default function Menu(properties){
    const MENU_CSS={display:"none"};
    const MENU_TITLE_CSS={
        marginRight:"10px",
        textAlign:"center"
    }
    return <div><h3 onClick={showOrHideMenu} className={properties.menuClass} style={MENU_TITLE_CSS}>{properties.name}</h3><div onClick={hideMenu} style={MENU_CSS}>{properties.children}</div></div>
}
