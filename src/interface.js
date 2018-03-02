import Vue from 'vue';

window.VoerroModalEvent = new Vue();

let showModal = (options, size) => {
    window.VoerroModalEvent.$emit('show', options, size);
}

export default showModal;