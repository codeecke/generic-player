export class JWPlayerConfiguration {
    private playerScriptUrl : string = '//content.jwplatform.com/libraries/lqsWlr4Z.js';

    public get player() {
        return this.playerScriptUrl;
    }

    public set player(src: string) {
        // Todo: Validate the src-url
        this.playerScriptUrl = src;
    }
}