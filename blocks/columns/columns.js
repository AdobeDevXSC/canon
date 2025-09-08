export default function decorate(block) {
  let bkgdColorAttr = document.querySelector('.columns-container').getAttribute('data-background-color');
  console.log('found data attribute for columns:', bkgdColorAttr);
  if (bkgdColorAttr && bkgdColorAttr !== 'null') {
    block.classList.add(`columns-bkgd-${bkgdColorAttr}`);
  }
  
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    const bkgdColorAttrRow = row.getAttribute('data-background-color');
    console.log('found data attribute for columns row:', bkgdColorAttrRow);
    if ((bkgdColorAttrRow && bkgdColorAttrRow !== 'null') || (bkgdColorAttr && bkgdColorAttr !== 'null')) {
      row.classList?.remove(`columns-bkgd-${bkgdColorAttrRow}`);
      row.classList?.add(`columns-bkgd-${bkgdColorAttrRow}`);
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
