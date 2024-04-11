window.onload = function () {
   var $ = function (id) {
      return document.getElementById(id);
   };
   var form = $("books-manager");
   var searchForm = $("search-form");
   var resultsTable = $("tbl-result");
   var name = $("name");
   var author = $("author");
   var publish = $("publish");
   var pages = $("pages");
   var table = $("tbl-books");
   var searchQ = $("search");

   var booksData = localStorage.getItem("books")
      ? JSON.parse(localStorage.getItem("books"))
      : [];

   var books = [];

   var Book = function (id, name, author, publishYear, pages) {
      this.id = id;
      this.author = author;
      this.name = name;
      this.publish = publishYear;
      this.pages = pages;
   };

   Book.prototype.calPrice = function () {
      return this.pages > 200 ? this.pages * 0.37 : this.pages * 0.4;
   };

   var init = function () {
      if (booksData.length == 0) {
         return;
      }
      for (let index = 0; index < booksData.length; index++) {
         books.push(
            new Book(
               booksData[index].id,
               booksData[index].name,
               booksData[index].author,
               booksData[index].publish,
               booksData[index].pages
            )
         );
      }
      displayBooks(table, sort(books));
   };

   var autoGenId = function () {
      return (new Date().getTime() * Math.random()).toFixed(0);
   };

   var sort = function (book) {
      return book.concat([]).sort(function (a, b) {
         return a.calPrice() - b.calPrice();
      });
   };

   var addBook = function () {
      var nameValue = name.value;
      var authorValue = author.value;
      var publishValue = parseInt(publish.value);
      var pagesValue = parseInt(pages.value);
      return new Book(
         autoGenId(),
         nameValue,
         authorValue,
         publishValue,
         pagesValue
      );
   };

   var addRow = function (table, book) {
      var bookData = [
         book.id,
         book.name,
         book.author,
         book.publish,
         book.pages,
         book.calPrice(),
      ];
      var newRow = table.children[1].insertRow(0);
      for (var i = 0; i < bookData.length; i++) {
         var newCell = newRow.insertCell(i);
         newCell.appendChild(document.createTextNode(bookData[i]));
      }
   };

   var displayBooks = function (table, books) {
      for (let index = 0; index < books.length; index++) {
         addRow(table, books[index]);
      }
   };

   var isValid = function () {
      if (
         name.value == "" ||
         author.value == "" ||
         publish.value == "" ||
         pages.value == "" ||
         isNaN(publish.value) ||
         isNaN(pages.value)
      ) {
         return false;
      }
      return true;
   };

   var handlerSubmitForm = function (event) {
      event.preventDefault();
      if (!isValid()) return;
      table.children[1].innerHTML = "";
      books.push(addBook());
      localStorage.setItem("books", JSON.stringify(books));
      displayBooks(table, sort(books));
   };

   form.onsubmit = handlerSubmitForm;

   searchForm.onsubmit = function (event) {
      event.preventDefault();
      var result = books.filter(function (item) {
         return item.name === searchQ.value; /////
      });
      resultsTable.children[1].innerHTML = "";
      displayBooks(resultsTable, result);
      /*
      ..........

      */      
   };

   




   init();
};
