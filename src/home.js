/* ========================================================================
 * Copyright 2016 Mälardalskartan
 * Licensed under BSD 2-Clause (https://github.com/malardalskartan/mdk/blob/master/LICENSE.txt)
 * ======================================================================== */
"use strict";

var ol = require('openlayers');
var $ = require('jquery');
var Viewer = require('./viewer');
var utils = require('./utils');

var map;
var tooltip;
var extent;

function Init(opt_options) {
  var options = opt_options || {};
  map = Viewer.getMap();
  tooltip = options.tooltipText || 'Zooma till hela kartan';
  extent = options.extent || map.getView().calculateExtent(map.getSize());
  render();
  bindUIActions();
}

function render() {
  var el = utils.createButton({
    id: 'home-button',
    iconCls: 'mdk-icon-fa-home',
    src: 'css/svg/fa-icons.svg#fa-home',
    tooltipText: tooltip
  });
  $('#map').append(el);
}

function bindUIActions() {
  $('#home-button').on('click', function(e) {
    map.getView().fit(extent, map.getSize());
    $('#home-button button').blur();
    e.preventDefault();
  });
}

module.exports.init = Init;
