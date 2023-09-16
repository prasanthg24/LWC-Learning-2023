import { LightningElement} from 'lwc';

export default class ClockTrack extends LightningElement {
    timeq;

    testHandler() {
        setInterval(() => {
            this.timeq = new Date().toLocaleTimeString();
        }, 1000);
    }
}