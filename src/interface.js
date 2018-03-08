import Vue from 'vue';

window.VoerroModalEvent = new Vue();

class VoerroModal {
    constructor () {}

    static show (options) {
        window.VoerroModalEvent.$emit('show', options);
    }
}

export default VoerroModal;