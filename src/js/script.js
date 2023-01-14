/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
  ('use strict');

  /* ____________________   HANDLEBARS    ____________________ */
  const templates = {
    bookList: Handlebars.compile(
      document.querySelector('#template-book').innerHTML
    ),
  };

  /* ____________________   VARIABLES    ____________________ */
  const select = {
    book: {
      list: '.books-list',
      image: 'book__image',
    },
    filters: '.filters',
  };

  const className = {
    favorite: 'favorite',
    hidden: 'hidden',
  };

  const favouriteBooks = [],
    filters = [];

  const render = function () {
    /* for each book of dataSource.books */
    for (const book of dataSource.books) {
      book.ratingBgc = determineRatingBgc(book.rating);
      book.ratingWidth = book.rating * 10;
      /* generate object of every book from array dataSource.books */
      const linkHTMLData = book;
      /* generate HTML based on template */
      const linkHTML = templates.bookList(linkHTMLData);
      /* create element using utils.createElementFromHTML */
      const generatedDOM = utils.createDOMFromHTML(linkHTML);
      /* find book container */
      const bookContianer = document.querySelector(select.book.list);
      /* add element to container */
      bookContianer.appendChild(generatedDOM);
    }
  };

  const initActions = function () {
    /* create new empty Array favouriteBooks */

    /* find book container */
    const bookContianer = document.querySelector(select.book.list);

    bookContianer.addEventListener('dblclick', function (event) {
      /* prevent default action for this event */
      event.preventDefault();

      const bookLink = event.target.offsetParent;

      if (bookLink.classList.contains(select.book.image)) {
        /* get 'data-id' attribute from the clicked link */
        const bookLinkDataId = bookLink.getAttribute('data-id');
        // console.log('bookLinkDataId:', bookLinkDataId);

        if (!favouriteBooks.includes(bookLinkDataId)) {
          /* add class favorite to bookLink */
          bookLink.classList.add(className.favorite);
          /* push bookLinkDataId 'data-id' attribute to favouriteBooks Array */
          favouriteBooks.push(bookLinkDataId);
        } else {
          /* remove class favorite to bookLink */
          bookLink.classList.remove(className.favorite);
          /* get indexOf bookLinkDataId from favouriteBooks Array */
          const removeProduct = favouriteBooks.indexOf(bookLinkDataId);
          /* delete bookLinkDataId from favouriteBooks Array */
          favouriteBooks.splice(removeProduct, 1);
        }
        console.log('favouriteBooks:', favouriteBooks);
      }
    });
    /* find filters container */
    const filtersContianer = document.querySelector(select.filters);

    filtersContianer.addEventListener('click', function (event) {
      /* make new constant named "inputValue" and give it the 'value' attribute of clicked input  */
      const inputValue = event.target.getAttribute('value');

      /* check if input is checked */
      if (event.target.checked == true) {
        /* push inputValue to filters array */

        filters.push(inputValue);
      } else {
        const removeValue = filters.indexOf(inputValue);
        // console.log('removeValue:', removeValue);
        filters.splice(removeValue, 1);
      }
      // console.log('filters:', filters);
      filterBooks();
    });
  };
  const filterBooks = function () {
    for (let book of dataSource.books) {
      let shouldBeHidden = false;
      for (const filter of filters) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      const hiddenBooks = document.querySelector(
        '.book__image[data-id="' + book.id + '"]'
      );

      if (shouldBeHidden) {
        hiddenBooks.classList.add(className.hidden);
      } else {
        hiddenBooks.classList.remove(className.hidden);
      }
    }
  };

  const determineRatingBgc = function (rating) {
    let background = '';

    if (rating < 6) {
      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8) {
      background = 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
    } else if (rating > 8 && rating <= 9) {
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (rating > 9) {
      background = 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
    }

    return background;
  };

  render();
  initActions();
}
