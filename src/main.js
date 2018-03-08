import Modal from './Modal.vue';
import showModal from './interface';

window.showModal = showModal;

if (document.querySelector('#voerro-vue-modal-demo-vqk6etkfjrcpsjg5')) {
    window.Modal = Modal;
}

export default Modal;