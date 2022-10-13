function tabs() {
    const tabs = document.querySelectorAll(`.tabheader__item`),
          tabsContent= document.querySelectorAll(`.tabcontent`),
          tabsParent = document.querySelector(`.tabheader__items`);

          function hideContent() {
            tabsContent.forEach(item => {
                item.style.display = 'none';
            });
            tabs.forEach( item => {
                item.classList.remove(`tabheader__item_active`);
            });
          }

          function showContent(i = 0) {
            tabsContent[i].style.display = 'block';
            tabs[i].classList.add(`tabheader__item_active`);
          }

          hideContent();
          showContent(0);

        tabsParent.addEventListener(`click`, (event) => {
            let target = event.target;

            if (target && target.classList.contains(`tabheader__item`)) {
                tabs.forEach((item, i) => {
                    if (target === item) {
                        hideContent();
                        showContent(i);     
                    }
                })
            }
        })
}

module.exports = tabs;

