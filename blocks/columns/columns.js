import { readBlockConfig } from '../../scripts/aem.js';

export default function decorate(block) {
  const ancestor = block.closest('.columns-container');
  const bkgdColorAttr = ancestor?.getAttribute('data-background-color');
  const textColorAttr = ancestor?.getAttribute('data-text-color');
  console.log('bkgdColorAttr in columns-container class: ', bkgdColorAttr, ' current block.style.backgroundColor: ', block.style.backgroundColor);

  if (bkgdColorAttr && bkgdColorAttr !== null) {
    block.style.backgroundColor = bkgdColorAttr;
    console.log('passing SECTION test, setting block.style.backgroundColor to: ', bkgdColorAttr);
  }
  if (textColorAttr) block.style.color = textColorAttr;

  // for UE as value needs to be saved in different element due to having to walk the DOM tree to set the values
  const columnsChild = block.querySelector('div');
  const ueBkgdColorAttr = columnsChild?.getAttribute('data-background-color');
  console.log('10 bkgdColorAttr in columns row UE: ', ueBkgdColorAttr);

  const ueTextColorAttr = columnsChild?.getAttribute('data-text-color');
  console.log('10 textColorAttr in columns row UE: ', ueTextColorAttr);

  if (ueBkgdColorAttr && ueBkgdColorAttr !== null) {
    console.log('10, passing definition test: ', ueBkgdColorAttr, " passing null test: ", ueBkgdColorAttr !== null);
    block.style.backgroundColor = ueBkgdColorAttr;
  // } else {
  //   console.log('9, failing definition test, resetting to currentBkgdColor: ', currentBkgdColor);
  //   block.style.backgroundColor = currentBkgdColor;
  }
  console.log('10 block.style.backgroundColor: ', block.style.backgroundColor);
  if (ueTextColorAttr && ueTextColorAttr != null) block.style.color = ueTextColorAttr;

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
