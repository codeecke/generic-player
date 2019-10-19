export const validationPattern: RegExp = /^https?:\/\/(www.)?vimeo.com\/([0-9]+)$/;
export class ElementValidator {
    public static validate(element: HTMLElement) : boolean {
        if (element.tagName.toLowerCase() === 'video') {
            const url: string | null = element.getAttribute('src');
            return !!(url && validationPattern.test(url));
        }
        return false;
    }
}