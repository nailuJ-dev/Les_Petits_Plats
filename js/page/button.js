export default class Buttons {
    static buttonsLaunching (button, open, close, hidePart) {
        button.addEventListener('click', () => {
            this.buttonDisplay(button);
            this.arrowHidden(open);
            this.hiddenPartDisplay(hidePart);
        });
        close.addEventListener('click', () => {
            this.buttonshideClick(button, open, hidePart);
        });
    };

    static buttonshideClick (button, open, hidePart) {
        this.buttonHidden(button);
        this.arrowDisplay(open);
        this.hidePartHidden(hidePart);
    };

    // Check this property once upon css is finally done
    static buttonDisplay (button) {
        button.style.width = '420px';
    };

    static buttonHidden (button) {
        button.style.width = '135px';
    };

    static arrowDisplay (open) {
        open.style.display = 'block';
    };

    static arrowHidden (open) {
        open.style.display = 'none';
    };

    static hiddenPartDisplay (hidePart) {
        hidePart.style.display = 'block';
    };

    static hidePartHidden (hidePart) {
        hidePart.style.display = 'none';
    };
};