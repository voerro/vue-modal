<template>
	<transition name="fade">
		<div class="modal-overlay" v-show="show">
			<!-- Used to close the modal by clicking on the overlay -->
			<div class="modal-sandbox" @click="hideModal"></div>
			
			<!-- Main modal container -->
			<div class="modal-box">
				<div class="modal-header">
					<div class="modal-title" v-text="title"></div>
					<div class="close-modal" @click="hideModal">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
						</svg>
					</div> 
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
				buttons: [],
				show: false
			}
		},

		created() {
			window.VoerroModalEvent.$on('show', (options) => {
				this.showModal(options);
			});

			window.VoerroModalEvent.$on('hideAll', () => {
				this.hideModal();
			});
		},

		methods: {
			showModal(options) {
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
						
						this.$nextTick(function () {
							this.show = true;
						});
					}
				} else {
					// Inline template
					if (this.id == options) {
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
	justify-content: top;
	padding: 1rem;
}

.modal-title {
	font-weight: bold;
}

.modal-body {
	position: relative;
	overflow: auto;
	padding: 0 1rem 1rem 1rem;
}

.modal-buttons {
	display: flex;
	text-align: right;
	border-top: 1px solid #f0f0f0;
}

.modal-buttons > button {
	flex: 1;
	cursor: pointer;

	border: none;
	text-decoration: none;
	
	border-radius: 0 0 .2rem .2rem;
	background: transparent;
	font-weight: bold;
}
.modal-buttons > button:hover {
	background: #f0f0f0;
}

/* Close Button */
.close-modal {
	display: flex;
	justify-content: center;
	align-items: center;

	position: absolute;
	top: .5rem;
	right: 1rem;

	border-radius: 50%;
	width: 2.5rem;
	height: 2.5rem;

	cursor: pointer;
	color: #505050;
}
.close-modal > svg {
	fill: #000;
	width: 1.5rem;
	height: 1.5rem;
}

.close-modal:hover {
	background: #000;
}
.close-modal:hover > svg {
	fill: #fff;
}


/**
* Responsivness
*/
/* Phones */
@media only screen and (max-width: 768px) {
	.modal-box {
		min-width: 95%;
	}

	.modal-buttons > button {
		padding: 1rem 1rem;
	}
}

/* Tablets */
@media only screen and (min-width: 769px) {
	.modal-box {
		min-width: 70%;
	}

	.modal-buttons > button {
		padding: .8rem 1rem;
	}
}

/* Desktops */
@media only screen and (min-width: 1024px) {
	.modal-box {
		min-width: 50%;
	}

	.modal-buttons > button {
		padding: .8rem 1rem;
	}
}
</style>