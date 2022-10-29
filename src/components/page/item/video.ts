import { BaseComponent } from './../../Component.js';

export class VideoComponent extends BaseComponent<HTMLElement>{
    constructor(title: string, url: string) {
        super(`<section class="video">
                <div class="video__player"><iframe class="video__iframe"></iframe></div>
                <h3 class="video__title"></h3>
                </section>`)
        
        const iframe = this.element.querySelector('.video__iframe')! as HTMLIFrameElement;
        // iframe.src = `https://www.youtube.com/embed/${this.extractVideoID(url)}`;
        iframe.src = this.converToEmbeddedURL(url);
        const titleElement = this.element.querySelector('.video__title')! as HTMLHeadElement;
        titleElement.textContent = title;
    }
    //정규표현식 Regex 
    private converToEmbeddedURL(url: string): string {
        const regExp = /^(?: https ?: \/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
        const match = url.match(regExp);
        const videoId = match ? match[1] || match[2] : undefined;
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
        }
        return url;

    // }
    // private extractVideoID(url: string): string {
    //     const filter = url.split("v=")[1]!.split("&")[0];
    //     return filter! as string;
    // }
}



