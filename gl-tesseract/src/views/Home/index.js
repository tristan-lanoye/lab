import './style.scss'

import App from '../../three/App'

window.app = new App({
    $canvas: document.querySelector('canvas#root'),
    useComposer: true
})
