window.addEventListener('DOMContentLoaded', () =>{

  
  //кнопка прокрутки наверх
  const arrowUp = document.querySelector(".arrow-up"); 
  window.addEventListener("scroll", ()=>{
    if (window.scrollY > 700) {
      arrowUp.classList.add("arrow-up__show");
    } else {
      arrowUp.classList.remove("arrow-up__show");
    }
  }); 

  arrowUp.addEventListener('click', (e)=> {
    e.preventDefault();

    window.scrollTo(0, 0);
  });

// слайдер general
const generalSwiper = new Swiper('.general__swiper', {
//   autoplay: {
//    delay: 3000,
//  },
 mousewheel: {
    invert: false,
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
   keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  touchRatio: 4,
  speed: 2000,
  spaceBetween: 100,
  watchOverflow: true,
  loop: true,
});

// слайдер exposition

const expositionSwiper = new Swiper('.exposition__gallery', {
  slidesPerView: 1,
  spaceBetween: 30,
  grabCursor: true,
  touchRatio: 2,
  watchOverflow: true,

  navigation: {
    nextEl: '.gallery__btn-prev',
    prevEl: '.gallery__btn-next',
  },

  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },
   keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
   mousewheel: {
    invert: false,
  },
  breakpoints: {
    // when window width is >= 320px
    350: {
      slidesPerView: 1.3
    },
    481: {
      slidesPerView: 1.6
    },
    578: {
      slidesPerView: 2
    },
    700: {
      slidesPerView: 2.5
    },
    993: {
      slidesPerView: 3
    },
    1201: {
      slidesPerView: 4
    }
  },
  speed: 500
});

// табы
  // табы раздела offers
  const tabs = document.querySelectorAll('.offers__item');
  const tabsContent = document.querySelectorAll('.offer__description');
  const tabsParent = document.querySelector('.offers__list');
  const btnTabHide = document.querySelectorAll('.offers__arrow'); 

 
  // убираем все классы активности
  function hideTabContent(tabsElem, tabsContentElem, descrActiveClass, TabActiveClass) {
    tabsContentElem.forEach(item => {
      item.classList.remove(descrActiveClass);    
    });
    tabsElem.forEach(item => {
      item.classList.remove(TabActiveClass);
    });  
    hideBtnTabHide(btnTabHide, 'offers__arrow-hidden');  
  }

  // прячем кнопку возврата
  function hideBtnTabHide(btnTabHideElem, descrActiveClass) {
    btnTabHideElem.forEach(item => {
      item.classList.add(descrActiveClass);    
    });
  }  

  // показываем конкретный таб - вешаем классы активности
  function showTabContent(i = 0, tabsContentElem, descrActiveClass, TabActiveClass) {
    tabsContentElem[i].classList.add(descrActiveClass);
    tabs[i].classList.add(TabActiveClass);
    showBtnTabHide(i, btnTabHide, 'offers__arrow-hidden');
  }

  // показываем кнопку возврата
  function showBtnTabHide(i, btnTabHideElem, descrActiveClass) {
    btnTabHideElem[i].classList.remove(descrActiveClass); 
  }
  
  tabsParent.addEventListener('click', (e) => {
    e.preventDefault();
    const target = e.target;  

    if (target && target.classList.contains('offers__item')) {   
      tabs.forEach((item, i) => {        
        if (target === item) {
          hideTabContent(tabs, tabsContent, 'offer__description-active', 'offers__item-active');
          showTabContent(i, tabsContent, 'offer__description-active', 'offers__item-active');
        }
      });
    }

    const arrow = target.closest('.offers__arrow');
    if (target && arrow) {
      btnTabHide.forEach((item) => {
        if (arrow === item) {
          hideTabContent(tabs, tabsContent, 'offer__description-active', 'offers__item-active');
          hideBtnTabHide(btnTabHide, 'offers__arrow-hidden');
        }
      });
    }
  });
  
  hideTabContent(tabs, tabsContent, 'offer__description-active', 'offers__item-active');
  

  // видео с Ютуба 
  // const videoPlayBtn = document.querySelector('.exposition__video-btn');
  // var player;
  // function onPlayerReady(e) {
  //   e.target.playVideo();
  // }
  // videoPlayBtn.addEventListener('click', function onYouTubeIframeAPIReady() {
  //       player = new YT.Player('player', {
  //         height: '100%',
  //         width: '100%',
  //         videoId: 'ZUj3vjJoIWg',
  //         events: {
  //           'onReady': onPlayerReady
  //         }
  //       });
  //     });

  // Статьи
  const articleItem = document.querySelectorAll('.articles__item');
  const articleTextParents = document.querySelectorAll('.article__content');
  const articlesList = document.querySelector('.articles__list');
  const articleFullTexts = document.querySelectorAll('.article__text');
  const articleBtn = document.querySelector('.article__btn');
  const article = document.querySelector('.article');

  hideActive(articleItem, 'articles__item-active', articleTextParents, 'article__content-active');
  showActive(0, articleItem, 'articles__item-active', articleTextParents, 'article__content-active');
  createDivForCutText(articleTextParents, articleFullTexts);
  changeFullText(articleFullTexts);

  
  // прячем табы и контент - убираем классы активности
  function hideActive(articleItemElem, ItemActiveClass, articleContentElem, contentActiveClass) {
    articleItemElem.forEach(item => {
      item.classList.remove(ItemActiveClass);    
    });
    articleContentElem.forEach(item => {
      item.classList.remove(contentActiveClass);
    });
  }

  // показываем конкретный таб - вешаем классы активности
  function showActive(i = 0, articleItemElem, ItemActiveClass, articleContentElem, contentActiveClass) {
    articleItemElem[i].classList.add(ItemActiveClass);
    articleContentElem[i].classList.add(contentActiveClass);
  }

  // обрезаем текст
  function cutText(textString) {
    let text = textString.replace(/\s+/g, ' ').trim();
    if (text.length > 260) {
      return `${text.slice(0, 260)}...`;
    } else {
      return text;
    }    
  }

  // создаем новый p для обрезанного текста и складываем туда обрезанный текст
  function createDivForCutText(ParentTextElem, fullTextElements) {
    ParentTextElem.forEach((parent, i) => {
      let newParagraph = document.createElement('p');
      newParagraph.classList.add('article__text-cut');
      parent.append(newParagraph);
      newParagraph.textContent = cutText(fullTextElements[i].textContent);
    });    
  }

  // переделываем разметку свернутой статьи
  function changeFullText(fullTextElements) {
    fullTextElements.forEach(fullText => {
      fullText.style.display = 'none';
    });
  }

  articlesList.addEventListener('click', (e) => {
    e.preventDefault();

    const target = e.target;  
    const listItem = target.closest('.articles__item');

    if (target && listItem) {
      articleItem.forEach((item, i) => {        
        if (listItem === item) {
          hideActive(articleItem, 'articles__item-active', articleTextParents, 'article__content-active');
          showActive(i, articleItem, 'articles__item-active', articleTextParents, 'article__content-active');
        }
      });
    }
  });

  //разворачиваем-сворачиваем статью  
  articleBtn.addEventListener('click', (e) => {
    e.preventDefault();

    articleTextParents.forEach((parentText, i) => {
      if (parentText.classList.contains('article__content-active')) {
        
        if (article.classList.contains('article-expand') && articlesList.classList.contains('articles__list-hidden')) {
            articleFullTexts[i].style.display = 'none';
            parentText.querySelector('.article__text-cut').style.display = 'block';
            article.classList.remove('article-expand');
            articlesList.classList.remove('articles__list-hidden');
            articleBtn.textContent = 'Читать далее';
        } else {
            articleFullTexts[i].style.display = 'block';
            parentText.querySelector('.article__text-cut').style.display = 'none';
            article.classList.add('article-expand');
            articlesList.classList.add('articles__list-hidden');
            articleBtn.textContent = 'К списку статей';
        }
      }
    });
    
  });
  
});