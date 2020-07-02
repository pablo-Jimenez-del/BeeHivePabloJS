class Bee {
    constructor(id, name, email, phone, username, website, address, company) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.username = username;
        this.website = website;
        this.address = address;
        this.company = company;
        this.post = [];
        this.todos = [];
        this.albums = [];
    }
    addPost(post) {
        this.post.push(post);
    }
    addTodos(todo) {
        this.todos.push(todo);
    }
    addAlbum(album) {
        this.albums.push(album);
    }
}