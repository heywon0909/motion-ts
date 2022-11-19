import { BaseComponent } from "../../Component.js";
import { MediaData } from "../dialog.js";

export class MediaSectionInput
  extends BaseComponent<HTMLElement>
  implements MediaData
{
  constructor() {
    super(`<div>
        <div class="form__container">
        <label for="title">Title</label>
        <input type="text" id="title">
        </div>
        <div class="form__container">
            <label for="url">Url</label>
            <input type="text" id="url">
            </div>
        </div>`);
  }
  get title(): string {
    const element = this.element.querySelector("#title")! as HTMLInputElement;
    return element.value;
  }
  get url(): string {
    const element = this.element.querySelector("#url")! as HTMLInputElement;
    return element.value;
  }
  getTextError():string | undefined{
    if(this.url=='' && this.title==''){
      return 'url과 title을 설정해주세요';
    }else{
      if(this.url=='') return 'url을 설정해주세요';
      if(this.title=='') return 'title을 설정해주세요';
      return '';
    }
  }
}
