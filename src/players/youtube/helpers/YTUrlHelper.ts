export class YTUrlHelper {

    private validators: { [key: string]: RegExp } = {
        default: /^https?:\/\/(www\.)?youtube.com\/watch\?v\=(?<video_id>[A-Za-z0-9\-_]+)$/,
        playlist: /^https?\:\/\/(www.)?(youtube\.com|youtu.be)\/watch\?v=(?<video_id>[A-Za-z0-9\-_]+)&list=(?<playlist_id>[A-Za-z0-9\-_]+)$/,
        shortUrl: /https?:\/\/youtu\.be\/(?<video_id>[A-Za-z0-9\-_]+)$/
    }

    constructor(private url: string) {
    }

    get isPlaylist(): boolean {
        return this.validators.playlist.test(this.url);
    }

    get isValid(): boolean {
        return !!this.getValidationResult();
    }

    get videoId(): string {
        const result = this.getValidationResult();
        return result.groups.video_id;
    }

    private getValidationResult(): any {
        const validators: RegExp[] = Object.values(this.validators);
        for (const validator of validators) {
            if (validator.test(this.url)) {
                return validator.exec(this.url);
            }
        }
        return null;
    }

}