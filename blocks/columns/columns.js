import { readBlockConfig } from '../../scripts/aem.js';

export default function decorate(block) {
  const ancestor = block.closest('.columns-container');
  let bkgdColorAttr = ancestor?.getAttribute('data-background-color');
  let textColorAttr = ancestor?.getAttribute('data-text-color');
  const columnsChild = block.querySelector('div');
  console.log('bkgdColorAttr in columns-container class: ', bkgdColorAttr);
  // for UE as value needs to be saved in different element due to having to walk the DOM tree to set the values
  if (bkgdColorAttr == null) {  
    console.log('bkgdColorAttr in columns-container class is NULL, why? checking columns row: ', bkgdColorAttr);
    bkgdColorAttr = columnsChild?.getAttribute('data-background-color');
    console.log('bkgdColorAttr in columns row', bkgdColorAttr);
  }
  if (textColorAttr == null) {
    console.log('textColorAttr in columns-container class is NULL, why? checking columns row: ', textColorAttr);
    textColorAttr = columnsChild?.getAttribute('data-text-color');
    console.log('textColorAttr in columns row', textColorAttr);
  }
  if (bkgdColorAttr != null) block.style.backgroundColor = bkgdColorAttr;
  if (textColorAttr != null) block.style.color = textColorAttr;

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
