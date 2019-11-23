export class ConsentContentConfiguration {
    public info: string;
    public accept: string;

    constructor(config: {info: string, accept: string}) {
        this.info = config.info || 'If you accept playing videos, your browser will load them from external servers (ie. Youtube, Vimeo, dailymotion or others).'
        this.accept = config.accept || 'Accept';
    }
}