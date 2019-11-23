import {EventDispatcher} from "../../abstracts/EventDispatcher";

class ConsentAcceptState extends EventDispatcher {
    public accepted : boolean = false;

    public accept() {
        this.accepted = true;
        this.dispatchEvent('accepted');
    }
}

export const consentAcceptState = new ConsentAcceptState();