class Book {
  constructor(name, author, isbn) {
    this.name = name;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookList(e) {
    const list = document.querySelector("#bookList");

    // Create a new row
    const row = document.createElement("tr");
    row.className = "listRow";
    row.innerHTML = `
                  <td>${e.name}</td>
                  <td>${e.author}</td>
                  <td>${e.isbn}</td>
                  <td><a href="#" class="delete">x</a></td>
    `;
    list.appendChild(row);
  }

  clearFields() {
    document.querySelector("#book_name").value = "";
    document.querySelector("#book_author").value = "";
    document.querySelector("#book_code").value = "";
  }

  showAlert(message, className) {
    // Create a new div
    const div = document.createElement("div");
    // Add class name to the div
    div.className = `alert ${className}`;
    // Add text content to the div
    div.innerText = message;
    // Insert the div after the heading
    const form = document.querySelector("#form-book");
    document.querySelector(".card").insertBefore(div, form);

    // Time Out after 3 second
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 1500);
  }

  deleteItem(e) {
    if (e.className === "delete") {
      e.parentElement.parentElement.remove();
    }
  }
}

// Add Event Listner
document.querySelector("#form-book").addEventListener("submit", function (e) {
  const name = document.querySelector("#book_name").value,
    author = document.querySelector("#book_author").value,
    isbn = document.querySelector("#book_code").value;

  // Instantiate Book
  const book = new Book(name, author, isbn);
  //   console.log(book);

  // Instantiate UI
  const ui = new UI();

  // Validate
  if (name === "" || author === "" || isbn === "") {
    ui.showAlert("Please Fill the blank fields", "error");
  } else {
    // Add book to the UI
    ui.addBookList(book);

    // Clear the field of the UI
    ui.clearFields();
    ui.showAlert("Book Added", "success");
  }

  e.preventDefault();
});

// Add event listner (event delegation) for delete button
document.querySelector("#bookList").addEventListener("click", function (e) {
  // Instantiate UI
  const ui = new UI();
  ui.deleteItem(e.target);

  ui.showAlert("Book Removed", "success");
  e.preventDefault();
});
