'use strict'

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
  const generalSwiper = new Swiper('.general__swiper', {
    autoplay: {
     delay: 3000,
   },
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
      releaseOnEdges: true
    },
    breakpoints: {
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
    const tabs = document.querySelectorAll('.offers__item');
    const tabsContent = document.querySelectorAll('.offer__description');
    const tabsParent = document.querySelector('.offers__list');
    const btnTabHide = document.querySelectorAll('.offers__arrow'); 
    hideTabContent();
    function hideTabContent() {
      tabsContent.forEach(item => {
        item.classList.remove('offer__description-active');    
      });
      tabs.forEach(item => {
        item.classList.remove('offers__item-active');
      });  
      hideBtnTabHide(btnTabHide, 'offers__arrow-hidden');  
    }
    function hideBtnTabHide() {
      btnTabHide.forEach(item => {
        item.classList.add('offers__arrow-hidden');    
      });
    } 
    function showTabContent(i = 0) {
      tabsContent[i].classList.add('offer__description-active');
      tabs[i].classList.add('offers__item-active');
      btnTabHide[i].classList.remove('offers__arrow-hidden'); 
    }    
    tabsParent.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.target;  

      if (target && target.classList.contains('offers__item')) {   
        tabs.forEach((item, i) => {        
          if (target === item) {
            hideTabContent();
            showTabContent(i);
          }
        });
      }
      const arrow = target.closest('.offers__arrow');
      if (target && arrow) {
        btnTabHide.forEach((item) => {
          if (arrow === item) {
            hideTabContent();
            hideBtnTabHide();
          }
        });
      }
    });
    const videoPlayBtn = document.querySelector('.exposition__video-btn');
    const videoWrapp = document.querySelector('.exposition__video-wrapp');
    videoPlayBtn.addEventListener('click', (e) => {
      e.preventDefault();
      videoWrapp.innerHTML = `
      <iframe width="100%" height="100%" src="https://www.youtube.com/embed/mDWlTX-yM1A" 
      title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; 
      clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
      </iframe>
      `
    })
    const articleItem = document.querySelectorAll('.articles__item');
    const articleTextParents = document.querySelectorAll('.article__content');
    const articlesList = document.querySelector('.articles__list');
    const articleFullTexts = document.querySelectorAll('.article__text');
    const articleBtnNext = document.querySelector('.article__btn-next');
    const articleBtnToList = document.querySelector('.article__btn-toList');
    const article = document.querySelector('.article');  
    hideActive();
    showActive();
    createDivForCutText();
    changeFullText();
    function hideActive() {
      articleItem.forEach(item => {
        item.classList.remove('articles__item-active');    
      });
      articleTextParents.forEach(item => {
        item.classList.remove('article__content-active');
      });
      article.classList.remove('article-expand');
      articlesList.classList.remove('articles__list-hidden');
    }
    function showActive(i = 0) {
      articleItem[i].classList.add('articles__item-active');
      articleTextParents[i].classList.add('article__content-active');
    }
    function cutText(textString) {
      let text = textString.replace(/\s+/g, ' ').trim();
      if (text.length > 260) {
        return `${text.slice(0, 260)}...`;
      } else {
        return text;
      }    
    }
    function createDivForCutText() {
      articleTextParents.forEach((parent, i) => {
        let newParagraph = document.createElement('p');
        newParagraph.classList.add('article__text-cut');
        parent.append(newParagraph);
        newParagraph.textContent = cutText(articleFullTexts[i].textContent);
      });    
    }
    function changeFullText() {
      articleFullTexts.forEach(fullText => {
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
    articleBtnNext.addEventListener('click', (e) => {
      e.preventDefault();
      articleTextParents.forEach((parentText, i) => {
        if (parentText.classList.contains('article__content-active')) {
              articleFullTexts[i].style.display = 'block';
              parentText.querySelector('.article__text-cut').style.display = 'none';
              article.classList.add('article-expand');
              articlesList.classList.add('articles__list-hidden');
              articleBtnNext.classList.add('article__btn-hidden');
              articleBtnToList.classList.remove('article__btn-hidden');
        }
      });
    })
    articleBtnToList.addEventListener('click', (e) => {
      e.preventDefault();  
      articleTextParents.forEach((parentText, i) => {
        if (parentText.classList.contains('article__content-active')) {          
          if (article.classList.contains('article-expand') && articlesList.classList.contains('articles__list-hidden')) {
              articleFullTexts[i].style.display = 'none';
              parentText.querySelector('.article__text-cut').style.display = 'block';
              article.classList.remove('article-expand');
              articlesList.classList.remove('articles__list-hidden');
              articleBtnNext.classList.remove('article__btn-hidden');
              articleBtnToList.classList.add('article__btn-hidden');
          }
        }
      });      
    });
