class Bee {
    constructor(id, name, email, phone, username, website, address, company, image, owner) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.username = username;
        this.website = website;
        this.address = address;
        this.company = company;
        this.posts = [];
        this.todos = [];
        this.albums = [];
        this.image = image;
        this.owner= owner;
    }
    addPost(post) {
        this.posts.push(post);
    }
    addTodo(todo) {
        this.todos.push(todo);
    }
    addAlbum(album) {
        this.albums.push(album);
    }
}