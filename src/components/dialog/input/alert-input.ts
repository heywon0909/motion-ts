import { BaseComponent,Component } from "../../Component.js";


export class AlertDialogInput extends BaseComponent<HTMLElement> implements Component {
   constructor(){
    super(`<img src="./assets/alert.png" style="width:40px;text-align:center" class="alert__icon"/>
    <p></p>`);
   }
}