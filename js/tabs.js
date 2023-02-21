

// табы
class Tabs {
  constructor (parentTabsListClass) {
    this.parentTabsListClass = document.querySelector(parentTabsListClass);
    this.hideTabContent = this.hideTabContent.bind();

    this.hideTabContent();
  }
  hideTabContent() {
    tabsContentElem.forEach(item => {
      item.classList.remove(descrActiveClass);    
    });
    tabsElem.forEach(item => {
      item.classList.remove(tabActiveClass);
    });  
    hideBtnTabHide(btnTabHide, 'offers__arrow-hidden');  
  }
}

let profiles = new Tabs (
  '.offers__list',

);


  
  // табы раздела offers
  const tabs = document.querySelectorAll('.offers__item');
  const tabsContent = document.querySelectorAll('.offer__description');
  const tabsParent = document.querySelector('.offers__list');
  const btnTabHide = document.querySelectorAll('.offers__arrow'); 

 
  // убираем все классы активности
  
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
       console.log(target) 
      btnTabHide.forEach((item) => {
        if (arrow === item) {
          hideTabContent(tabs, tabsContent, 'offer__description-active', 'offers__item-active');
          hideBtnTabHide(btnTabHide, 'offers__arrow-hidden');
        }
      });
    }
  });
  
  hideTabContent(tabs, tabsContent, 'offer__description-active', 'offers__item-active');


   // Статьи
  const articleBtn = document.querySelector('.article__btn');
  const article = document.querySelector('.article');
  const articlesList = document.querySelector('.articles__list');
  const articleTextParent = document.querySelectorAll('.article__content');
  const articleTextSelector = document.querySelector('.article__text');
  const articleText = articleTextSelector.textContent;

  createDivForCutText();
  if(!article.classList.contains('article-expand') && !articlesList.classList.contains('articles__list-hidden')) {
    changeFullText();
  }

  //разворачиваем-сворачиваем статью  
  articleBtn.addEventListener('click', () => {
    if (article.classList.contains('article-expand') && articlesList.classList.contains('articles__list-hidden')) {
      changeFullText();
      article.classList.remove('article-expand');
      articlesList.classList.remove('articles__list-hidden');
      articleBtn.textContent = 'Читать далее';
    } else {
      returnFullText();
      article.classList.add('article-expand');
      articlesList.classList.add('articles__list-hidden');
      articleBtn.textContent = 'К списку статей';
    }
  });

  // обрезаем текст
  function cutText() {
    let text = articleText.replace(/\s+/g, ' ').trim();
    if (text.length > 260) {
      return `${text.slice(0, 260)}...`;
    } else {
      return text
    }    
  }

  // создаем новый div для обрезанного текста
  function createDivForCutText() {
    let newParagraph = document.createElement('div');
    const list = ['article__text-cut', 'text'];
    newParagraph.classList.add(...list);
    articleTextParent.forEach(item => {
      item.append(newParagraph);
      newParagraph.textContent = cutText();
    }) 
  }

  // переделываем разметку свернутой статьи
  function changeFullText() {
    articleTextSelector.style.display = 'none';
    document.querySelector('.article__text-cut').style.display = 'block';
  }

  // вернуть полную разметку 
  function returnFullText() {
    document.querySelector('.article__text-cut').style.display = 'none';  
    articleTextSelector.style.display = 'block';
  }

  