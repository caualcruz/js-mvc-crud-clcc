import { formNewUser } from "./form-component.js";
import { view } from "./table-component.js";

const view = {
    render:()=>{
        formNewUser.render();
        view.render();
    },

    update:(userArray, userToUpdate)=>{        
        view.update(userArray);
        formNewUser.update(userToUpdate);
        console.log(userArray, userToUpdate);
    },

    updateForm:(userToUpdate)=>{ 
        formNewUser.update(userToUpdate);
    }
}

export {view}