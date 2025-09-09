export default function decorate(block) {
  let ancestor = block.closest('.columns-container');
  let bkgdColorAttr = ancestor?.getAttribute('data-background-color');
  let textColorAttr = ancestor?.getAttribute('data-text-color');

  console.log('found data attribute for columns:', bkgdColorAttr);

  if (bkgdColorAttr) block.style = `background-color: ${bkgdColorAttr})`;
  if (textColorAttr) block.style = `color: ${textColorAttr}`;

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
