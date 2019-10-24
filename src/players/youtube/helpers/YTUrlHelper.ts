export class YTUrlHelper {

    private validators: { [key: string]: RegExp } = {
        default: /^https?:\/\/(www\.)?(youtube\.com|youtu.be)\/watch\?v\=([A-Za-z0-9\-_]+)$/,
        playlist: /^https?\:\/\/(www.)?(youtube\.com|youtu.be)\/watch\?v=([A-Za-z0-9\-_]+)&list=([A-Za-z0-9\-_]+)$/,
        shortUrl: /https?:\/\/youtu\.be\/([A-Za-z0-9\-_]+)$/
    };
    private videoIdPositions: {[key: string]: number} = {
        default: 3,
        playlist: 3,
        shortUrl: 1
    };

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
        if(result) {
            const position = this.videoIdPositions[result.validatorName];
            console.log(result, this.url, result.match[position]);
            return result.match[position];
        }
        return '';
    }

    private getValidationResult(): {match: any, validatorName: string} | null {
        for (const validatorName in this.validators) {
            const validator = this.validators[validatorName];
            if (validator.test(this.url)) {
                return {match: validator.exec(this.url), validatorName};
            }
        }
        return null;
    }

}