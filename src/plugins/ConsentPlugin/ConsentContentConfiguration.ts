export class ConsentContentConfiguration {
    public info: string;
    public accept: string;

    constructor(config: {info: string | null, accept: string | null} = {info: null, accept: null}) {
        this.info = config.info || 'If you accept playing videos, your browser will load them from external servers (ie. Youtube, Vimeo, dailymotion or others).'
        this.accept = config.accept || 'Accept';
    }
}