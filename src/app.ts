import { TodoComponent } from "./components/page/item/todo.js";
import { NoteComponent } from "./components/page/item/note.js";
import { VideoComponent } from "./components/page/item/video.js";
import { ImageComponent } from "./components/page/item/image.js";
import {
  Composable,
  PageComponent,
  PageItemComponent,
} from "./components/page/page.js";
import { Component } from "./components/component.js";
import {
  AlertDialog,
  InputDialog,
  MediaData,
  TextData,
} from "./components/dialog/dialog.js";
import { MediaSectionInput } from "./components/dialog/input/media-input.js";
import { TextSectionInput } from "./components/dialog/input/text-input.js";
import {
  ColorPickerComponent,
  Picker,
} from "./components/page/picker/colorPicker.js";
import { Button, ButtonComponent } from "./components/page/button/button.js";
import { TransparentControlPicker } from "./components/page/picker/transparentPicker.js";
// import { DragAndDrop } from "./util/drag.js";

type InputComponentConstructor<T = (MediaData | TextData) & Component> = {
  new (): T;
};
type PastePickerConstructor<T = Component & Picker> = T[];
class App {
  private readonly page: Component & Composable;
  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    const colorBtn = document.querySelector("#new-color")! as HTMLElement;
    let elemArr: HTMLElement[] = [
      document.querySelector("header")! as HTMLElement,
      document.querySelector("footer")! as HTMLElement,
    ];
    colorBtn.addEventListener("click", () => {
      const dialog = new InputDialog();
      const color = new ColorPickerComponent(elemArr);
      dialog.addChild(color);
      dialog.attachTo(dialogRoot);
      dialog.setOnCloseListener(() => {
        color.unbindChange();
        dialog.removeFrom(this.dialogRoot);
      });
      dialog.setOnSubmitListener(() => {
        color.changeSetting();
        dialog.removeFrom(this.dialogRoot);
      });
    });

    this.bindElementDialog<MediaSectionInput>(
      "#new-image",
      MediaSectionInput,
      (input: MediaSectionInput) => new ImageComponent(input.title, input.url)
    );

    this.bindElementDialog<MediaSectionInput>(
      "#new-video",
      MediaSectionInput,
      (input: MediaSectionInput) => new VideoComponent(input.title, input.url)
    );

    this.bindElementDialog<TextSectionInput>(
      "#new-note",
      TextSectionInput,
      (input: TextSectionInput) => new NoteComponent(input.title, input.body)
    );

    this.bindElementDialog<TextSectionInput>(
      "#new-todo",
      TextSectionInput,
      (input: TextSectionInput) => new TodoComponent(input.title, input.body)
    );

    // For demo :)
    this.page.addChild(
      new ImageComponent("Image Title", "https://picsum.photos/800/400")
    );
    this.page.addChild(
      new VideoComponent("Video Title", "https://youtu.be/D7cwvvA7cP0")
    );
    this.page.addChild(
      new NoteComponent("Note Title", "Don't forget to code your dream")
    );
    this.page.addChild(new TodoComponent("Todo Title", "TypeScript Course!"));
    this.page.addChild(
      new ImageComponent("Image Title", "https://picsum.photos/800/400")
    );
    this.page.addChild(
      new VideoComponent("Video Title", "https://youtu.be/D7cwvvA7cP0")
    );
    this.page.addChild(
      new NoteComponent("Note Title", "Don't forget to code your dream")
    );
    this.page.addChild(new TodoComponent("Todo Title", "TypeScript Course!"));
  }
  // PICKER 버튼 넣기
  private bindPickerBtn<T extends Component & Button>(
    pageAttachableComponent: Component,
    AttachblePickerButton: T,
    makePicker: () => PastePickerConstructor
  ) {
    const settingBtn = AttachblePickerButton;
    this.page.addChild(pageAttachableComponent, settingBtn);

    // const draggableItem = new DragAndDrop(

    // );
    // console.log("draggableItem", draggableItem);
    settingBtn.setOnModalListener(() => {
      const picker_dialog = new InputDialog();

      const pickerItems = makePicker();

      picker_dialog.attachTo(this.dialogRoot);
      picker_dialog.addChild(...pickerItems);
      picker_dialog.setOnCloseListener(() => {
        pickerItems.forEach((picker) => {
          picker.unbindChange();
        });
        picker_dialog.removeFrom(this.dialogRoot);
      });

      picker_dialog.setOnSubmitListener(() => {
        let alert: string[] = [];
        pickerItems.forEach((picker) => {
          const change = picker.changeSetting();
          if (change != undefined) {
            alert.push(change! as string);
          }
        });

        if (alert[0] == undefined) {
          picker_dialog.removeFrom(this.dialogRoot);
        } else {
          const alert_dialog = new AlertDialog(alert);
          alert_dialog.attachTo(document.body);
          alert_dialog.setOnCloseListener(() => {
            alert_dialog.removeFrom(document.body);
          });
          alert = [];
        }
      });
    });
  }
  private bindElementDialog<T extends (MediaData | TextData) & Component>(
    selector: string,
    InputComponent: InputComponentConstructor<T>,
    makeSection: (input: T) => Component
  ) {
    const element = document.querySelector(selector)! as HTMLElement;
    element.addEventListener("click", () => {
      const dialog = new InputDialog();
      const input = new InputComponent();
      dialog.addChild(input);
      dialog.attachTo(this.dialogRoot);
      dialog.setOnCloseListener(() => {
        dialog.removeFrom(this.dialogRoot);
      });
      dialog.setOnSubmitListener(() => {
        //섹션을 만들어서 페이지에 추가해준다
        if (input.getTextError() != undefined) {
          const alert_dialog = new AlertDialog([input.getTextError()!]);
          alert_dialog.attachTo(document.body);
          alert_dialog.setOnCloseListener(() => {
            alert_dialog.removeFrom(document.body);
          });
          return;
        }
        const elem = makeSection(input);

        const settingBtn = new ButtonComponent("setting");

        // const array: PastePickerConstructor = [
        //   new ColorPickerComponent([elem.rootElement]),
        //   new TransparentControlPicker([elem.rootElement]),
        // ];
        this.bindPickerBtn<ButtonComponent>(elem, settingBtn, () => [
          new ColorPickerComponent([elem.rootElement]),
          new TransparentControlPicker([elem.rootElement]),
        ]);
        // this.page.addChild(elem, colorBtn);
        // colorBtn.setOnModalListener(() => {
        //   const picker_dialog = new InputDialog();
        //   const color = new ColorPickerComponent([elem.rootElement]);
        //   picker_dialog.addChild(color);
        //   picker_dialog.attachTo(this.dialogRoot);
        //   picker_dialog.setOnCloseListener(() => {
        //     picker_dialog.removeFrom(this.dialogRoot);
        //   });
        //   picker_dialog.setOnSubmitListener(() => {
        //     color.changeSetting();
        //     picker_dialog.removeFrom(this.dialogRoot);
        //   });
        // });
        dialog.removeFrom(this.dialogRoot);
      });
    });
  }
}

new App(document.querySelector(".document")! as HTMLElement, document.body);
