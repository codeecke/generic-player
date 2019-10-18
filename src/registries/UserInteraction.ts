let clicked: boolean = false;
document.body.addEventListener('click', () => {

});

export const UserInteracted = {
    get() {
        return clicked;
    }
};