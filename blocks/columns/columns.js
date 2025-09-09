export default function decorate(block) {
  const ancestor = block.closest('.columns-container');
  const bkgdColorAttr = ancestor?.getAttribute('data-background-color');
  const textColorAttr = ancestor?.getAttribute('data-text-color');

  if (bkgdColorAttr) block.style.backgroundColor = bkgdColorAttr;
  if (textColorAttr) block.style.color = textColorAttr;

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
