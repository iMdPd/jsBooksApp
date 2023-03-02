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

      thisBookList.favouriteBooks = [];
      thisBookList.filters = [];

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

      thisBookList.bookContianer = document.querySelector(select.book.list);
      thisBookList.filtersContianer = document.querySelector(select.filters);
    }

    render() {
      const thisBookList = this;

      for (const book of thisBookList.data) {
        book.ratingBgc = thisBookList.determineRatingBgc(book.rating);
        book.ratingWidth = book.rating * 10;
        const linkHTMLData = book;
        const linkHTML = templates.bookList(linkHTMLData);
        const generatedDOM = utils.createDOMFromHTML(linkHTML);
        thisBookList.bookContianer.appendChild(generatedDOM);
      }
    }

    initActions() {
      const thisBookList = this;
      thisBookList.bookContianer.addEventListener('dblclick', function (event) {
        event.preventDefault();

        const bookLink = event.target.offsetParent;

        if (bookLink.classList.contains(select.book.image)) {
          const bookLinkDataId = bookLink.getAttribute('data-id');

          if (!thisBookList.favouriteBooks.includes(bookLinkDataId)) {
            bookLink.classList.add(className.favorite);
            thisBookList.favouriteBooks.push(bookLinkDataId);
          } else {
            bookLink.classList.remove(className.favorite);
            const removeProduct =
              thisBookList.favouriteBooks.indexOf(bookLinkDataId);
            thisBookList.favouriteBooks.splice(removeProduct, 1);
          }
        }
      });

      thisBookList.filtersContianer.addEventListener('click', function (event) {
        const inputValue = event.target.getAttribute('value');

        if (event.target.checked == true) {
          thisBookList.filters.push(inputValue);
        } else {
          const removeValue = thisBookList.filters.indexOf(inputValue);
          thisBookList.filters.splice(removeValue, 1);
        }
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
