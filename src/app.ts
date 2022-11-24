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

type AttachableBtn<T extends Button> = T;
type PastePickerConstructor<T = Picker> = { new (): T };
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
    const color = new ColorPickerComponent();
    color.changableTarget = elemArr;
    colorBtn.addEventListener("click", () => {
      console.log("계속타니");
      const dialog = new InputDialog();
      dialog.addChild(color);
      dialog.attachTo(this.dialogRoot);
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
      (input: MediaSectionInput) => new ImageComponent(input.title, input.url),
      () => new ButtonComponent("setting"),
      () => [ColorPickerComponent, TransparentControlPicker]
    );

    this.bindElementDialog<MediaSectionInput>(
      "#new-video",
      MediaSectionInput,
      (input: MediaSectionInput) => new VideoComponent(input.title, input.url),
      () => new ButtonComponent("setting"),
      () => [ColorPickerComponent, TransparentControlPicker]
    );

    this.bindElementDialog<TextSectionInput>(
      "#new-note",
      TextSectionInput,
      (input: TextSectionInput) => new NoteComponent(input.title, input.body),
      () => new ButtonComponent("setting"),
      () => [ColorPickerComponent, TransparentControlPicker]
    );

    this.bindElementDialog<TextSectionInput>(
      "#new-todo",
      TextSectionInput,
      (input: TextSectionInput) => new TodoComponent(input.title, input.body),
      () => new ButtonComponent("setting"),
      () => [ColorPickerComponent, TransparentControlPicker]
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

  private bindElementDialog<T extends (MediaData | TextData) & Component>(
    selector: string,
    InputComponent: InputComponentConstructor<T>,
    makeSection: (input: T) => Component,
    makeFilter: () => AttachableBtn<Button>,
    makePicker: () => PastePickerConstructor<Picker>[]
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
        const pickerBtn = makeFilter();
        console.log("pickerBtn", pickerBtn);
        this.page.addChild(elem, pickerBtn);
        const pickerConstructor = makePicker();
        console.log("pickerCon", pickerConstructor);
        let bindPickerList: Picker[] = [];
        pickerConstructor.forEach((picker) => {
          bindPickerList.push(new picker());
        });

        bindPickerList.forEach((picker) => {
          picker.changableTarget = [elem.rootElement];
        });

        pickerBtn.setOnModalListener(() => {
          const picker_dialog = new InputDialog();
          picker_dialog.addChild(bindPickerList);
          picker_dialog.attachTo(this.dialogRoot);
          picker_dialog.setOnCloseListener(() => {
            bindPickerList.forEach((picker) => {
              picker.unbindChange();
            });
            picker_dialog.removeFrom(this.dialogRoot);
          });
          picker_dialog.setOnSubmitListener(() => {
            let alert: string[] = [];
            bindPickerList.forEach((picker) => {
              const change = picker.changeSetting();
              if (change != null) {
                alert.push(change! as string);
              }
            });

            if (alert[0] == undefined) {
              picker_dialog.removeFrom(this.dialogRoot);
            } else {
              const alert_dialog = new AlertDialog(alert);
              alert_dialog.attachTo(this.dialogRoot);
              alert_dialog.setOnCloseListener(() => {
                alert_dialog.removeFrom(this.dialogRoot);
              });
              alert = [];
            }
          });
        });

        dialog.removeFrom(this.dialogRoot);
      });
    });
  }
}

new App(document.querySelector(".document")! as HTMLElement, document.body);
