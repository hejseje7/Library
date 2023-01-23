const addBtn = document.querySelector(".addBook")
const formBackground = document.querySelector(".formBackground")
const formPopup = document.querySelector(".formPopup")
const formAddBook = document.querySelector(".formContainer")
const bookContainer = document.querySelector(".bookContainer")
const titleInput = document.querySelector("#title")
const bookBox = document.createElement('div');
let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        return title + " by " + author + ", " + pages + ", " + read;
    }
}

// const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295 pages', 'not read yet');

function addBookToLibrary(e) {
    e.preventDefault()
    let form = e.target;
    let title = form.elements.title.value;
    let author = form.elements.author.value;
    let pages = form.elements.pages.value + " pages";
    let read = form.elements.readIt.checked == true ? "Have read" : "Not read yet";
    let readCheck = form.elements.readIt.checked == true ? "checked" : "not-checked";
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    console.log(newBook.info());
    let bookBox = document.createElement('div');
    let content = document.createElement('div');
    bookBox.classList.add('bookBox');
    content.classList.add('bookTitle');
    content.textContent = `"${newBook.title}"`;
    bookBox.appendChild(content);
    content = document.createElement('div');
    content.classList.add('bookAuthor');
    content.textContent = newBook.author;
    bookBox.appendChild(content);
    content = document.createElement('div');
    content.classList.add('pages');
    content.textContent = newBook.pages;
    bookBox.appendChild(content);
    content = document.createElement('button');
    content.classList.add('read', readCheck);
    content.textContent = newBook.read;
    content.addEventListener('click', readBtn);
    bookBox.appendChild(content);
    content = document.createElement('button');
    content.classList.add('remove');
    content.textContent = 'remove';
    content.addEventListener('click', removeBtn);
    bookBox.appendChild(content);


    bookContainer.appendChild(bookBox);
    form.reset();
    closeForm();
}

function openForm() {
    formBackground.style.display = "block"
    formPopup.style.display = "block"
}
function closeForm() {
    formBackground.style.display = "none"
    formPopup.style.display = "none"
    formAddBook.reset()
}

function readBtn(e) {
    let title = e.target.parentElement.firstElementChild.textContent.replace(/"/gi, '')
    const target = myLibrary.filter(book => (book.title == title));
    if (target[0].read == "Have read") {
        target[0].read = "Not read yet"
        e.target.classList.remove("checked")
        e.target.classList.add("not-checked")
        e.target.textContent = target[0].read
    }
    else {
        target[0].read = "Have read"
        e.target.classList.remove("not-checked")
        e.target.classList.add("checked")
        e.target.textContent = target[0].read
    }
}

function removeBtn(e) {
    let title = e.target.parentElement.firstElementChild.textContent.replace(/"/gi, '')
    e.target.parentElement.remove();
    const target = myLibrary.filter(book => (book.title == title));
    let filtered = myLibrary.filter(item => item !== target[0]);
    myLibrary = filtered;
}

function checkField(e) {
    const target = myLibrary.filter(book => (book.title == e.target.value));
    if (target.length !== 0) {
        console.log("Error");
    }
}

addBtn.addEventListener('click', openForm)
formBackground.addEventListener('click', closeForm)
formAddBook.addEventListener('submit', addBookToLibrary);
titleInput.addEventListener('change', checkField);



// const downloadBtn = document.querySelector(".download")
// const formDownload = document.querySelector(".formContainer")
// const downloadLink = document.querySelector(".downloadLink")
// let isValidCheck = formDownload.checkValidity()

// formDownload.addEventListener('change', validTest);

// downloadBtn.addEventListener('click', function downloadFile() {
//     if(isValidCheck==true) {
//         window.open("/static/hjemmeside/images/file.pdf");
//         downloadLink.click();
//         formDownload.submit();
//     };
// });

// function openForm() {
//     document.getElementById("popupForm").style.display = "block";
//     document.getElementById("formBackground").style.display = "block";
// }
//   function closeForm() {
//     document.getElementById("popupForm").style.display = "none";
//     document.getElementById("formBackground").style.display = "none";
// }
// function validTest() {
//     isValidCheck = formDownload.checkValidity()
// }
