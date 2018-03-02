<template>
	<div class="modal" v-show="show">
	    <div class="modal-sandbox" @click="hideModal"></div>
	    <div class="modal-box">
	        <div class="modal-header">
	            <div class="modal-title"><h2 v-text="title"></h2></div>
	            <div class="close-modal" @click="hideModal">&#10006;</div> 
	        </div>

	        <div class="modal-body">
	        	<div v-html="body"></div>

	        	<div class="modal-buttons">
	        		<button v-for="(btn, index) in buttons"
							:key="index"
	        				class="btn btn-default mr-1"
	        				@click="handleButtonClick(btn.handler)">
	        			{{ btn.text }}
	        		</button>
	        	</div>
	        </div>
	    </div>
	</div>
</template>

<style>
.modal,
.modal-box {
	z-index: 900;
}

.modal-sandbox {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background: transparent;
}

.modal {
	display: block; 
	position: fixed;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	background: rgb(0,0,0);
	background: rgba(0,0,0,.8);
	overflow: auto;
}

.modal-box {
	position: relative;
	width: 60%;
	margin: 100px auto;
	animation-name: modalbox;
	animation-duration: .3s;
	animation-timing-function: ease-out;
}

.modal-header {
	display: flex;
	background: #000000;
	color: #ffffff;
}

.modal-title {
	flex: 1;
}

.modal-title h2 {
	color: #ffffff;
	margin: 0;
}

.modal-body {
	background: #ffffff;
}

.modal-buttons {
	margin-top: 1rem;
	text-align: right;
}

/* Close Button */
.close-modal {
	cursor: pointer;
}
</style>

<script>
	export default {
		props: ['id'],

		data() {
			return {
				title: '',
				body: '',
				show: false,
				buttons: [],
				defaultSize: 60 
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

							document.querySelector('body').style.overflow = 'hidden';
						});
					}
				} else {
					// Inline template
					if (this.id == options) {
						this.setWidth(size ? `${size}%` : `${this.defaultSize}%`);

						this.$nextTick(function () {
							this.show = true;

							document.querySelector('body').style.overflow = 'hidden';
						});
					}
				}
			},

			hideModal() {
				this.show = false;
				document.querySelector('body').style.overflow = 'auto';
			},

			handleButtonClick(handler) {
				if (handler) {
					handler();
				}
				
				this.hideModal();
			},

			setWidth(width) {
				let modalBoxes = document.getElementsByClassName('modal-box');

				for (let i = 0; i < modalBoxes.length; i++) {
					modalBoxes[i].style.width = width;
				}
			}
		}
	}
</script>