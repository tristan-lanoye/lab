import './main.scss';

import Dropdown from '../Utils/js/Dropdown'

for(const el of Array.from(document.querySelectorAll('.dropdown-container'))) {
    new Dropdown(el)
}
