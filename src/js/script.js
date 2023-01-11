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
    books: {
      list: '.books-list',
      image: '.books-list .book__image',
    },
  };

  const add = {
    class: {
      favorite: 'favorite',
    },
  };

  const render = function () {
    /* for each book of dataSource.books */
    for (const book of dataSource.books) {
      /* generate object of every book from array dataSource.books */
      const linkHTMLData = book;
      /* generate HTML based on template */
      const linkHTML = templates.bookList(linkHTMLData);
      /* create element using utils.createElementFromHTML */
      const generatedDOM = utils.createDOMFromHTML(linkHTML);
      /* find book container */
      const bookContianer = document.querySelector(select.books.list);
      /* add element to container */
      bookContianer.appendChild(generatedDOM);
    }
  };

  const initActions = function () {
    /* create new empty Array favouriteBooks */
    const favouriteBooks = [];
    /* find all bookLinks and save them to variable: bookLinks */
    const booksLinks = document.querySelectorAll(select.books.image);
    // console.log('booksLinks:', booksLinks);
    /* for each link of bookLinks */
    for (const bookLink of booksLinks) {
      bookLink.addEventListener('dblclick', function (event) {
        /* prevent default action for this event */
        event.preventDefault();
        /* get 'data-id' attribute from the clicked link */
        const bookLinkDataId = bookLink.getAttribute('data-id');
        // console.log('bookLinkDataId:', bookLinkDataId);

        if (!favouriteBooks.includes(bookLinkDataId)) {
          /* add class favorite to bookLink */
          bookLink.classList.add(add.class.favorite);
          /* push bookLinkDataId 'data-id' attribute to favouriteBooks Array */
          favouriteBooks.push(bookLinkDataId);
        } else {
          /* remove class favorite to bookLink */
          bookLink.classList.remove(add.class.favorite);
          /* get indexOf bookLinkDataId from favouriteBooks Array */
          const removeProduct = favouriteBooks.indexOf(bookLinkDataId);
          /* delete bookLinkDataId from favouriteBooks Array */
          favouriteBooks.splice(removeProduct, 1);
        }
        console.log('favouriteBooks:', favouriteBooks);
      });
    }
  };

  render();
  initActions();
}
