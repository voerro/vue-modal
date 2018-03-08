import Modal from './Modal.vue';
import VoerroModal from './interface';

if (document.querySelector('#voerro-vue-modal-demo-vqk6etkfjrcpsjg5')) {
    window.Modal = Modal;
    window.VoerroModal = VoerroModal;
}

export { Modal, VoerroModal };