import Vue from 'vue';

window.VoerroModalEvent = new Vue();

class VoerroModal {
    constructor () {}

    static show (options) {
        window.VoerroModalEvent.$emit('show', options);
    }

    static hide (id = null) {
        window.VoerroModalEvent.$emit('hide', id);
    }
}

export default VoerroModal;