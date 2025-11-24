export function add(event){
        event.preventDefault();
        const item=document.createElement("li");
        const box=document.createElement("input");
      //  box.contentEditable=true;
        box.style.width="100px";
        box.style.display="block";
        item.style.border="1px solid black";
        const remove=document.createElement("button");
        remove.textContent="Remove";
        remove.style.backgroundColor="red";
        remove.style.marginLeft="100px";
        remove.addEventListener("click", function(){
            item.parentElement.removeChild(item);
           
        });
        item.appendChild(box);
        item.appendChild(remove);
        event.target.parentElement.insertBefore(item, event.target);
    }