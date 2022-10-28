import { BaseComponent } from './../../Component.js';

export class VideoComponent extends BaseComponent<HTMLElement>{
    constructor(title: string, url: string) {
         super(`<section class="video">
                <div class="video__player"><iframe class="video__iframe"></iframe></div>
                <h3 class="video__title"></h3>
                </section>`)
        
        const iframe = this.element.querySelector('.video__iframe')! as HTMLIFrameElement;
        console.log(url);
        iframe.src = 'https://www.youtube.com/embed/K3-jG52XwuQ'; // url -> videoId -> embed
        
        const titleElement = this.element.querySelector('.video__title')! as HTMLHeadElement;
        titleElement.textContent = title;

        
    }

}

