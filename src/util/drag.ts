import { Component } from "../components/component.js";

type componentList<T extends Component> = T[];
export class DragAndDrop<T extends Component> {
  constructor(targetList: componentList<T>) {
    console.log("targetList", targetList);
  }
}
