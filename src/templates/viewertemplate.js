import helpers from '../utils/templatehelpers';

export default obj => (`<div id="o-map" class="${obj.mapClass}">
  <div id="o-tools-left" class="o-container-absolute o-tools-left">
    <div id="o-toolbar-navigation" class="o-toolbar-vertical o-toolbar-navigation"></div>
    <div id="o-toolbar-maptools" class="o-toolbar-vertical o-toolbar-maptools"></div>
    <div id="o-toolbar-misc" class="o-toolbar-vertical o-toolbar-misc"></div>
  </div>
  <div id="o-tools-bottom" class="o-tools-bottom"></div>
  </div>`);
