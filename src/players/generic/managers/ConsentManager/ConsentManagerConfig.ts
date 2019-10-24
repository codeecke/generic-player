export class ConsentManagerConfig {
    public enabled: boolean = false;
    public content: { info: string, accept: string } = {
        info: 'If you accept playing videos, your browser will load them from external servers (ie. Youtube, Vimeo, dailymotion or others).',
        accept: 'Accept'
    };
}
