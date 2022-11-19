import { BaseComponent } from "../../Component.js";
import { TextData } from "../dialog.js";

export class TextSectionInput
  extends BaseComponent<HTMLElement>
  implements TextData
{
  constructor() {
    super(`<div>
        <div class="form__container">
        <label for="title">Title</label>
        <input type="text" id="title">
        </div>
        <div class="form__container">
            <label for="body">Body</label>
            <textarea type="text" id="body" row="3"></textarea>
            </div>
        </div>`);
  }
  get title(): string {
    const element = this.element.querySelector("#title")! as HTMLInputElement;
    return element.value;
  }
  get body(): string {
    const element = this.element.querySelector("#body")! as HTMLInputElement;
    return element.value;
  }
  getTextError():string | undefined{
    if(this.body=='' && this.title==''){
      return 'body과 title을 설정해주세요';
    }else{
      if(this.body=='') return 'body을 설정해주세요';
      if(this.title=='') return 'title을 설정해주세요';
      return undefined;
    }
  }
}
