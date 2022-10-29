import { TodoComponent } from './components/page/item/todo.js';
import { NoteComponent } from './components/page/item/note.js';
import { VideoComponent } from './components/page/item/video.js';
import { ImageComponent } from './components/page/item/image.js';
import { PageComponent } from './components/page/page.js';

class App{
    private readonly page: PageComponent;
    constructor(appRoot: HTMLElement) {
        this.page = new PageComponent();
        this.page.attachTo(appRoot);

        const image = new ImageComponent('Image Title', 'https://picsum.photos/600/300');
        image.attachTo(appRoot, 'beforeend');

        const video = new VideoComponent('video title', 'https://www.youtube.com/watch?v=C87fr5Q12aY');
        video.attachTo(appRoot, 'beforeend');

        const note = new NoteComponent('note title', 'note Body');
        note.attachTo(appRoot, 'beforeend');

        const todo = new TodoComponent('Todo Title', 'Todo Item');
        todo.attachTo(appRoot, 'beforeend');
    }
}

new App(document.querySelector('.document')! as HTMLElement);