const UUID = require('uuid');

const posts = new Map();

const createPost = ({name, description}) => {
    const post = {
        //name: obj.name, or :
        name,
        //description: obj.description, or :
        description,
        id: UUID.v4(),
        date: new Date()
    };
    posts.set(post.id, post);
    return post;
};

const getPosts = () => {
    // posts.values() will return the iterator, however, spread syntax is used here...
    // '...' is the spread syntax, it spreads the iterator into individual values.
    // [...posts.values()] --> will spread the values in the iterator, and puts them
    // into arrays

    return [...posts.values()];

    // using the spread syntax in another way :
    // const getPosts = (a, ...b) => {
    //      return [...posts.values()];
    // }
    // getPost('name', 'value', 'text');
    // In the above line, 'name' will be assigned to 'a' and
    // both 'value' and 'text' will be assigned as an array to 'b'.
}

const getPost = (id) => {
    return posts.get(id);
}

module.exports = {
    createPost,
    getPost,
    getPosts
};