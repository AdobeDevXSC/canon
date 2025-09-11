import { readBlockConfig } from '../../scripts/aem.js';

export default function decorate(block) {
  const ancestor = block.closest('.columns-container');
  const bkgdColorAttr = ancestor?.getAttribute('data-background-color');
  const textColorAttr = ancestor?.getAttribute('data-text-color');
  console.log('bkgdColorAttr in columns-container class: ', bkgdColorAttr);

  if (bkgdColorAttr) block.style.backgroundColor = bkgdColorAttr;
  const currentBkgdColor = block.style.backgroundColor;
  if (textColorAttr) block.style.color = textColorAttr;

  // for UE as value needs to be saved in different element due to having to walk the DOM tree to set the values
  const columnsChild = block.querySelector('div');
  const ueBkgdColorAttr = columnsChild?.getAttribute('data-background-color');
  console.log('7 bkgdColorAttr in columns row UE: ', ueBkgdColorAttr);

  const ueTextColorAttr = columnsChild?.getAttribute('data-text-color');
  console.log('7 textColorAttr in columns row UE: ', ueTextColorAttr);

  if (ueBkgdColorAttr && ueBkgdColorAttr != null && (!block.style.backgroundColor || block.style.backgroundColor == 'white')) {
    block.style.backgroundColor = ueBkgdColorAttr;
  } else {
    block.style.backgroundColor = currentBkgdColor;
  }
  console.log('7 block.style.backgroundColor: ', block.style.backgroundColor);
  if (ueTextColorAttr && ueTextColorAttr != null && !block.style.color) block.style.color = ueTextColorAttr;

  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });
}
