# Vue Modal

[![npm (scoped)](https://img.shields.io/npm/v/@voerro/vue-modal.svg?style=flat-square)](https://www.npmjs.com/package/@voerro/vue-modal)
[![npm](https://img.shields.io/npm/dm/@voerro/vue-modal.svg?style=flat-square)](https://www.npmjs.com/package/@voerro/vue-modal)
[![MIT](https://img.shields.io/github/license/AlexMordred/vue-modal.svg?style=flat-square)](https://opensource.org/licenses/MIT)

A flexible & responsive modal component for Vue.js 2. Looks nice and clean on all devices.

[Live Demo](https://voerro.github.io/vue-modal/)

## Installation via NPM

```
npm i @voerro/vue-modal --save-dev
```
or
```
npm i @voerro/vue-modal --save
```

Then import the component:

```javascript
import { Modal, VoerroModal } from '@voerro/vue-modal';

Vue.component('modal', Modal);
window.VoerroModal = VoerroModal;
```

## Usage

Add an empty component somewhere inside your template.

```html
<modal></modal>
```

### Generating Modals Dynamically

Call `VoerroModal.show()` from anywhere in your script/Vue code. Example call:

```
VoerroModal.show({
    title: 'Modal Title',
    body: 'Modal Body (HTML is supported here)',
    buttons: [
        {
            text: 'Ok',
            handler: () => {
                alert('You pressed Ok');
            }
        },
        {
            text: 'Cancel'
        }
    ]
});
```

You can add as many buttons as you need. When you press a button, the button's `handler` gets called and then the modal closes. If there's no handler, the modal will close immediately without any additional actions taking place.

#### Buttons - Options

To add buttons to a modal include an array of button objects. Each object can have the following properties (options):

Property | Type | Default | Required | Description
--- | --- | --- | --- | ---
text | String | '' | yes | The text of the button
handler | function | undefined | no | The function which will be called on button press. The default action is to hide the modal, so you don't have to include anything if the button click should only close the modal.
preventDefault | Boolean | undefined (false) | no | Even if you provide a handler, the modal will be closed after the action is done. To prevent that set this property to true.
class | String | '' | no | Additional CSS class(es) to add to the button.
type | String | 'button' | no | Button type: 'submit', 'reset', or 'button'.

#### Ajax

You can fetch the modal's body via Ajax. To do so provide a `bodyUrl` URL instead of a `body`. Example:

```
VoerroModal.show({
    title: 'Modal Title',
    bodyUrl: 'http://example.com/add-user-modal',
    buttons: [
        {
            text: 'Submit',
            handler: () => {
                alert('Submitting the form...');
            }
        },
        {
            text: 'Cancel'
        }
    ]
});
```

### Inline Modals

You can have multiple inline modals. "Inline" means a modal's content is stored within the HTML code of a page. Each modal should have a unique id. See an example below.

HTML:

```html
<modal id="inline-modal" v-cloak>
    <template slot="title">Inline Title</template>

    <div slot="body">
        This body, as well as the title, are stored directly within the HTML of your page.
    </div>

    <div slot="footer">
        You'll have to implement the buttons completely yourself, in case you need them of course.
    </div>
</modal>

<modal id="inline-modal-two" v-cloak>
    <template slot="title">Inline 2</template>

    <div slot="body">This is a different inline modal with a different id.</div>
</modal>
```

JS/ES:

```javascript
// Show the modal with the id = 'inline-modal'
VoerroModal.show('inline-modal');

// Show the modal with the id = 'inline-modal-two'
VoerroModal.show('inline-modal-two');
```

You can still include an object with options (including dynamically generated buttons) in the method call.

```javascript
VoerroModal.show('inline-modal', {
    buttons: [
        {
            text: 'Ok',
            handler: () => {
                alert('You pressed ok');
            }
        },
        { text: 'CLose' }
    ]
});
```

*Note: don't delete the empty `<modal></modal>` component from your page if you also want to use dynamically generated modals.*

### `<modal>` Properties

Property | Type | Default | Required | Description
--- | --- | --- | --- | ---
id | String | undefined | no | Id of the modal
dismissible | Boolean | true | no | Whether a modal can be closed by clicking on the close button or on the overlay outside the modal.<br>When applied to the global `<modal>` component becomes the default for all the dynamically generated modals. Can be overridden for individual modals.
header | Boolean | true | no | Whether to show the header.<br>When applied to the global `<modal>` component becomes the default for all the dynamically generated modals. Can be overridden for individual modals.

### VoerroModal Methods

Method | Description | Arguments
---| --- | ---
show (options) | Generate and show a modal | *options* - an object with options<br><br>**Available Options:**<br>*title* - String - modal's title<br>*body* - String - modal's body (HTML is supported)<br>*bodyUrl* - String - URL to fetch modal's body from (AJAX)<br>*buttons* - Array - an array of objects describing buttons<br>*dismissible* - Boolean - Whether the modal can be closed by clicking on the close button or on the overlay outside the modal.<br>*header* - Boolean - Whether to show the header.
show (id) | Show an inline modal by id | *id* - the id of a modal to be shown
hide (id) | Hide a modal by id | *id* - the id of a modal to be hidden.
hide () | Hide the currently open dynamically generated modal | -

## License

This is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).