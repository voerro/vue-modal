import Vue from 'vue';

window.VoerroModalEvent = new Vue();

class VoerroModal {
    constructor () {}

    static show(optionsOrId, options) {
        window.VoerroModalEvent.$emit('show', optionsOrId, options);
    }

    static hide (id = null) {
        window.VoerroModalEvent.$emit('hide', id);
    }
}

export default VoerroModal;