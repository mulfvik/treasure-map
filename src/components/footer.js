import { Component } from '../ui';

export default function Footer(options = {}) {
  const {
    cls = '',
    data = {}
  } = options;

  return Component({
    render: function render() {
      let middleContent = '';
      middleContent += data.img ? `<img src="${data.img}" />` : '';
      middleContent += data.text ? `<p>${data.text}</p>` : '';
      middleContent = data.url ? `<a href="${data.url}" target="_blank">${middleContent}</a>` : middleContent;
      return ``;
    }
  });
}
