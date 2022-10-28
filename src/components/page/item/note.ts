import { BaseComponent } from './../../Component.js';
export class NoteComponent extends BaseComponent<HTMLElement>{
    constructor(title: string, body: string) {
        super(`<section class="note">
                <div class="note_holder"><div class="note__thumbnail"></div></div>
                <p class="note__body"></p>
             </section>`);
        
        const noteElement = this.element.querySelector('.note__thumbnail')! as HTMLParagraphElement;
        noteElement.textContent = title;

        const contentElement = this.element.querySelector('.note__body')! as HTMLParagraphElement;
        contentElement.textContent = body;
    }
}