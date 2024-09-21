let books = [];
let editingIndex = null;

const bookForm = document.getElementById('book-form');
const bookList = document.getElementById('book-list');
const searchBox = document.getElementById('search-box');
const successMessage = document.getElementById('success-message');

bookForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('book-title').value.trim();
    const author = document.getElementById('author').value.trim();
    const genre = document.getElementById('genre').value.trim();
    const status = document.getElementById('status').value;

    // Kiểm tra nhập liệu
    if (!title || !author || !genre || !status) {
        alert("Tất cả các trường không được để trống!");
        return;
    }

    if (title.length > 100) {
        alert("Tên sách không được quá 100 ký tự!");
        return;
    }

    if (editingIndex === null) {
        books.push({ title, author, genre, status });
        successMessage.textContent = "Sách đã được thêm thành công!";
    } else {
        if (confirm("Bạn có chắc chắn muốn cập nhật thông tin sách này không?")) {
            books[editingIndex] = { title, author, genre, status };
            editingIndex = null;
            document.getElementById('submit-btn').textContent = "Thêm Sách";
            successMessage.textContent = "Thông tin sách đã được cập nhật!";
        }
    }

    successMessage.style.display = "block"; 
    setTimeout(() => successMessage.style.display = "none", 3000); 
    
    bookForm.reset();
    renderBookList();
});

function deleteBook(index) {
    if (confirm("Bạn có chắc chắn muốn xóa sách này không?")) {
        books.splice(index, 1);
        renderBookList();
    }
}

function editBook(index) {
    const book = books[index];
    document.getElementById('book-title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('genre').value = book.genre;
    document.getElementById('status').value = book.status;
    editingIndex = index;
    document.getElementById('submit-btn').textContent = "Cập nhật Sách";
    successMessage.textContent = ""; 
}

searchBox.addEventListener('input', function() {
    renderBookList();
});

function renderBookList() {
    const searchQuery = searchBox.value.toLowerCase();
    const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchQuery));

    bookList.innerHTML = filteredBooks.length ? filteredBooks.map((book, index) => `
        <tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.genre}</td>
            <td>${book.status}</td>
            <td>
                <button class="btn-edit" onclick="editBook(${index})">Sửa</button>
                <button class="btn-delete" onclick="deleteBook(${index})">Xóa</button>
            </td>
        </tr>
    `).join('') : `<tr><td colspan="5" style="text-align:center;">Không có sách nào được tìm thấy</td></tr>`;
}
