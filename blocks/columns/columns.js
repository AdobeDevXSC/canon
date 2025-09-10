import { readBlockConfig } from '../../scripts/aem.js';

export default function decorate(block) {
  const ancestor = block.closest('.columns-container');
  let bkgdColorAttr = ancestor?.getAttribute('data-background-color');
  let textColorAttr = ancestor?.getAttribute('data-text-color');
  const columnsChild = block.querySelector('div');
  console.log('bkgdColorAttr in columns-container class', bkgdColorAttr);
  if (!bkgdColorAttr) {
    bkgdColorAttr = columnsChild?.getAttribute('data-background-color');
    console.log('bkgdColorAttr in columns row', bkgdColorAttr);
  }
  if (!textColorAttr) {
    textColorAttr = columnsChild?.getAttribute('data-text-color');
  }
  if (bkgdColorAttr) block.style.backgroundColor = bkgdColorAttr;
  if (textColorAttr) block.style.color = textColorAttr;

  // test
  // const blockConfig = readBlockConfig(block);
  // console.log('blockConfig', blockConfig);
  // const columnsChild = block.querySelector('div');
  // const testBkgdColorAttr = blockConfig?.['background-color'] || columnsChild?.getAttribute('data-background-color');
  // const testTextColorAttr = columnsChild?.getAttribute('data-text-color');
  // console.log('testBkgdColorAttr', testBkgdColorAttr);
  // console.log('testTextColorAttr', testTextColorAttr);
  // if (testBkgdColorAttr) block.style.backgroundColor = testBkgdColorAttr;
  // if (testTextColorAttr) block.style.color = testTextColorAttr;

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
