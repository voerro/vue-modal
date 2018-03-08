<template>
	<transition name="fade">
		<div class="modal-overlay" v-show="show">
			<!-- Used to close the modal by clicking on the overlay -->
			<div class="modal-sandbox" @click="hideModal"></div>
			
			<!-- Main modal container -->
			<div class="modal-box">
				<div class="modal-header">
					<div class="modal-title"><h2 v-text="title"></h2></div>
					<div class="close-modal" @click="hideModal">&#10006;</div> 
				</div>

				<div class="modal-body">
					<div v-html="body"></div>
				</div>

				<div class="modal-buttons">
					<button v-for="(btn, index) in buttons"
							:key="index"
							@click="handleButtonClick(btn.handler)">
						{{ btn.text }}
					</button>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		props: ['id'],

		data() {
			return {
				title: '',
				body: '',
				show: false,
				buttons: [],
				defaultSize: 50
			}
		},

		created() {
			window.VoerroModalEvent.$on('show', (options, size) => {
				this.showModal(options, size);
			});

			window.VoerroModalEvent.$on('hideAll', () => {
				this.hideModal();
			});
		},

		methods: {
			showModal(options, size) {
				if (typeof options === 'object') {
					// Modal constructor
					if (! this.id) {
						this.title = options.title ? options.title : '';
						this.body = options.body ? options.body : '';
						this.buttons = options.buttons ? options.buttons : [];

						if (options.bodyUrl) {
							// TODO: modify the loader
							this.body = `<p class="text-center">
								<span class="fa fa-2x fa-spin fa-spinner"></span>
							</p>`;

							axios.get(options.bodyUrl).then((response) => {
								this.body = response.data;
							});
						} else {
							this.body = options.body ? options.body : '';
						}

						this.setWidth(options.size
							? `${options.size}%`
							: `${this.defaultSize}%`);

						this.$nextTick(function () {
							this.show = true;
						});
					}
				} else {
					// Inline template
					if (this.id == options) {
						this.setWidth(size ? `${size}%` : `${this.defaultSize}%`);

						this.$nextTick(function () {
							this.show = true;
						});
					}
				}
			},

			hideModal() {
				this.show = false
			},

			handleButtonClick(handler) {
				if (handler) {
					handler();
				}
				
				this.hideModal();
			},

			setWidth(width) {
				// let modalBoxes = document.getElementsByClassName('modal-box');

				// for (let i = 0; i < modalBoxes.length; i++) {
				// 	modalBoxes[i].style.width = width;
				// }
			}
		}
	}
</script>

<style>
/**
* Basic modal CSS
*/
.modal-overlay,
.modal-box {
	z-index: 900;
}

.modal-overlay {
	display: flex;
	flex-direction: column;
	justify-content: center;

	position: fixed;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;

	background: rgba(0, 0, 0, .5);
}

.modal-sandbox {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background: transparent;
}

.modal-box {	
	display: flex;
	flex-direction: column;

	position: relative;
	min-width: 50%;
	max-width: 95%;
	max-height: 95%;
	margin: 0 auto;

	background: #fff;
	border-radius: .2rem;
	box-shadow: 0 0 2rem 0 rgba(0, 0, 0, .25);
}

/**
* Transitions
*/
.fade-enter-active, .fade-leave-active {
	transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	opacity: 0;
}

/**
* Styling
*/
.modal-header {
	display: flex;
}

.modal-title {
	flex: 1;
}

.modal-body {
	position: relative;
	overflow: auto;
}

.modal-buttons {
	text-align: right;
}

/* Close Button */
.close-modal {
	cursor: pointer;
}
</style>