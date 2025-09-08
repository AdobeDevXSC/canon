export default function decorate(block) {
  let bkgdColorAttr = document.querySelector('.section').getAttribute('data-background-color');
  console.log('found data attribute for columns:', bkgdColorAttr);
  if (bkgdColorAttr) {
    block.classList.add(`columns-bkgd-${bkgdColorAttr}`);
  }
  
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    const bkgdColorAttrRow = row.getAttribute('data-background-color-t');
    if (bkgdColorAttrRow) {
      row.classList.add(`columns-bkgd-${bkgdColorAttrRow}`);
    }
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
