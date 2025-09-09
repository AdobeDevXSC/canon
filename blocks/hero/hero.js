/**
 * loads and decorates the hero
 * @param {Element} block The hero block element
 */
export default async function decorate(block) {
  const imgWrapper = block.querySelector(':scope > div > div > p:first-of-type');

  const div = document.createElement('div');
  div.classList.add('overlay');
  imgWrapper.prepend(div);
}
