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

  class BooksList {
    constructor() {
      const thisBookList = this;

      thisBookList.initData();
      thisBookList.getElements();
      thisBookList.render();
      thisBookList.initActions();
      thisBookList.filterBooks();
    }

    initData() {
      const thisBookList = this;
      thisBookList.data = dataSource.books;
    }

    getElements() {
      const thisBookList = this;
      thisBookList.favouriteBooks = [];
      thisBookList.filters = [];

      thisBookList.bookContianer = document.querySelector(select.book.list);
      thisBookList.filtersContianer = document.querySelector(select.filters);
    }

    render() {
      const thisBookList = this;

      /* for each book of thisBookList.data */
      for (const book of thisBookList.data) {
        /* add new book data named ratingBgc */
        book.ratingBgc = thisBookList.determineRatingBgc(book.rating);
        /* add new book data named ratingWidth */
        book.ratingWidth = book.rating * 10;
        /* generate object of every book from array thisBookList.data */
        const linkHTMLData = book;
        /* generate HTML based on template */
        const linkHTML = templates.bookList(linkHTMLData);
        /* create element using utils.createElementFromHTML */
        const generatedDOM = utils.createDOMFromHTML(linkHTML);
        /* add element to thisBookList.bookContianer */
        thisBookList.bookContianer.appendChild(generatedDOM);
      }
    }

    initActions() {
      const thisBookList = this;
      /* add event listener on 'dblclick' to thisBookList.bookContianer */
      thisBookList.bookContianer.addEventListener('dblclick', function (event) {
        /* prevent default action for this event */
        event.preventDefault();

        /* make new const for event.trget.offsetParent */
        const bookLink = event.target.offsetParent;

        if (bookLink.classList.contains(select.book.image)) {
          /* get 'data-id' attribute from the clicked link */
          const bookLinkDataId = bookLink.getAttribute('data-id');
          // console.log('bookLinkDataId:', bookLinkDataId);

          if (!thisBookList.favouriteBooks.includes(bookLinkDataId)) {
            /* add class favorite to bookLink */
            bookLink.classList.add(className.favorite);
            /* push bookLinkDataId 'data-id' attribute to favouriteBooks Array */
            thisBookList.favouriteBooks.push(bookLinkDataId);
          } else {
            /* remove class favorite to bookLink */
            bookLink.classList.remove(className.favorite);
            /* get indexOf bookLinkDataId from favouriteBooks Array */
            const removeProduct =
              thisBookList.favouriteBooks.indexOf(bookLinkDataId);
            /* delete bookLinkDataId from favouriteBooks Array */
            thisBookList.favouriteBooks.splice(removeProduct, 1);
          }
          console.log('favouriteBooks:', thisBookList.favouriteBooks);
        }
      });

      thisBookList.filtersContianer.addEventListener('click', function (event) {
        /* make new constant named "inputValue" and give it the 'value' attribute of clicked input  */
        const inputValue = event.target.getAttribute('value');

        /* check if input is checked */
        if (event.target.checked == true) {
          /* push inputValue to filters array */

          thisBookList.filters.push(inputValue);
        } else {
          const removeValue = thisBookList.filters.indexOf(inputValue);
          // console.log('removeValue:', removeValue);
          thisBookList.filters.splice(removeValue, 1);
        }
        // console.log('filters:', filters);
        thisBookList.filterBooks();
      });
    }

    filterBooks() {
      const thisBookList = this;

      for (let book of thisBookList.data) {
        let shouldBeHidden = false;
        for (const filter of thisBookList.filters) {
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
    }

    determineRatingBgc(rating) {
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
    }
  }
  new BooksList();
}
