export const validationPattern: RegExp = /^https?:\/\/(www.)?vimeo.com\/(?<video_id>[0-9]+)$/;
export class ElementValidator {
    public static validate(element: HTMLElement) {
        if (element.tagName.toLowerCase() === 'video') {
            const url: string | null = element.getAttribute('src');
            return !!(url && validationPattern.test(url));
        }
        return false;
    }
}