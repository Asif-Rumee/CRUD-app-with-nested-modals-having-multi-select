let posts = [
    { id: 1, name: 'Rumee', description: 'Software engineering........', category: ['Electronics', 'Software'] },
    { id: 2, name: 'Asif', description: 'Data structures and algorithms......', category: ['Electronics'] },
    { id: 3, name: 'Ratul', description: 'Programming languages......', category: ['Software'] }
];

let categories = [
    { id: 1, name: 'Social' },
    { id: 2, name: 'Technology' },
    { id: 3, name: 'Academic' }
];

let postsID = posts.length + 1;
let catID = categories.length + 1;

function findPost(postId) {
    return posts[findPostIndex(postId)];
};

function findPostIndex(postId) {
    for (let idx = 0; idx < posts.length; idx++) {
        if (posts[idx].id == postId) {
            return idx;
        }
    }
};

let Home = Vue.extend({
    template: '#home-page',
    methods: {

    },
});

let PostsList = Vue.extend({
    template: '#post-list',
    data: function () {
        return { posts: posts, searchKey: '' };
    },
    computed: {
        filteredPosts: function () {
            var self = this;
            console.log()
            return self.posts.filter(function (post) {
                return post.name.indexOf(self.searchKey) !== -1
            })
        }
    }
});

let Post = Vue.extend({
    template: '#post',
    data: function () {
        return { post: findPost(this.$route.params.post_id) };
    }
});

let PostEdit = Vue.extend({
    template: '#edit-post',
    props: ['updatePost'],
    data: function () {
        return { post: findPost(this.$route.params.post_id) };
    },
    watch: {
        updatePost: function () {
            var post = this.post;
            posts[findPostIndex(post.id)] = {
                id: post.id,
                name: this.$parent.postName,
                description: this.$parent.description,
                category: this.$parent.category
            };
            router.push('/');
            this.$emit('editCompletePost');
        }
    }
});

let PostDelete = Vue.extend({
    template: '#delete-post',
    props: ['deletePost'],
    data: function () {
        return { post: findPost(this.$route.params.post_id) };
    },
    watch: {
        deletePost: function () {
            posts.splice(findPostIndex(this.$route.params.post_id), 1);
            router.push('/');
            this.$emit('delCompletePost');
        }
    }
});

let AddPost = Vue.extend({
    template: '#add-post',
    props: ['createPost'],
    data: function () {
        return {
            post: { name: '', description: '', category: [] }
        }
    },
    watch: {
        createPost: function () {
            var post = this.post;

            posts.push({
                id: postsID++,
                name: this.$parent.postName,
                description: this.$parent.description,
                category: this.$parent.category
            });
            router.push('/');
            this.$emit('createCompletePost');
        }
    }
});

function findCategory(categoryId) {
    return categories[findCategoryIndex(categoryId)];
};

function findCategoryIndex(categoryId) {
    for (let indx = 0; indx < categories.length; indx++) {
        if (categories[indx].id == categoryId) {
            return indx;
        }
    }
};

let Categories = Vue.extend({
    template: '#categories',
    data: function () {
        return { categories: categories, id: 0, showModal: false };
    },
    computed: {
        categoriesList: function () {

            return this.categories;
        }
    },
    methods: {
        getId: function () {
            return this.id;
        }
    }
});

let AddCategory = Vue.extend({
    template: '#add-category',
    props: ['createCategory'],
    data: function () {
        return {
            category: { name: '' }
        }
    },
    watch: {
        createCategory: function () {
            let category = this.category;
            categories.push({
                id: catID++,
                name: this.$parent.catName
            });
            router.push('/');
            this.$emit('createComplete');
        },
    },
});

let EditCategory = Vue.extend({
    template: '#edit-category',
    props: ['editCategory'],
    data: function () {
        return { category: findCategory(this.$route.params.category_id) };
    },
    watch: {
        editCategory: function () {
            let category = this.category;
            categories[findCategoryIndex(category.id)] = {
                id: category.id,
                name: this.$parent.catName
            };
            router.push('/');
            this.$emit('editComplete');
        }
    }
});

let DeleteCategory = Vue.extend({
    template: '#delete-category',
    props: ['deleteCategory'],
    data: function () {
        return { category: findCategory(this.$route.params.category_id) };
    },
    watch: {
        deleteCategory: function () {
            categories.splice(findCategoryIndex(this.$route.params.category_id), 1);
            router.push('/');
            this.$emit('delComplete');
        }

    }
});


let router = new VueRouter({
    routes: [{ path: '/', component: Home, meta: { title: 'Home' } },
    { path: '/posts', component: PostsList, meta: { title: 'Posts' } },
    { path: '/post/:post_id', component: Post, name: 'post', meta: { title: 'Post Details' } },
    { path: '/add-post', component: AddPost, meta: { title: 'Make new Post' } },
    { path: '/post/:post_id/edit', component: PostEdit, name: 'edit-post', meta: { title: 'Edit Post' } },
    { path: '/post/:post_id/delete', component: PostDelete, name: 'delete-post', meta: { title: 'Delete Post' } },
    { path: '/categories', component: Categories, name: 'categories', meta: { title: 'Categories', showModal: true } }, //children: [{ path: ':category_id/delete', name: 'modal-delete-category', component: DeleteCategory, props: true, meta: { showModal: true } }] 
    { path: '/add-category', component: AddCategory, meta: { title: 'Add Category' } },
    { path: '/category/:category_id/edit', component: EditCategory, name: 'edit-category', meta: { title: 'Edit Category' } },
    { path: '/category/:category_id/delete', component: DeleteCategory, name: 'delete-category', meta: { title: 'Delete Category' } }
    ]
});


let app = new Vue({
    router: router,
    template: '<router-view :deletePost="ifDelPost" v-on:delCompletePost="deletePostComplete" :deleteCategory="ifDelCat" v-on:delComplete="deleteCategoryComplete" :editCategory="ifEditCat" v-on:editComplete="editCategoryComplete" :updatePost="ifEditPost" v-on:editCompletePost="editPostComplete" :createCategory="ifAddCat" v-on:createComplete="createCategoryComplete" :createPost="ifAddPost" v-on:createCompletePost="createPostComplete"></router-view>',

    components: {

    },
    data: {
        ifDelCat: false,
        ifEditCat: false,
        ifAddCat: false,
        catName: '',
        postName: '',
        description: '',
        category: [],
        ifDelPost: false,
        ifEditPost: false,
        ifAddPost: false,
    },

    methods: {
        deleteCategoryRoot: function () {
            this.ifDelCat = true;
            console.log("deleted category");
        },
        deleteCategoryComplete: function () {
            this.ifDelCat = false;
            console.log("delete completed");
        },
        editCategoryRoot: function (catName) {
            this.ifEditCat = true;
            this.catName = catName;
            console.log("edited category");
        },
        editCategoryComplete: function () {
            this.ifEditCat = false;
            console.log("edit completed");
        },
        createCategoryRoot: function (catName) {
            this.ifAddCat = true;
            this.catName = catName;
            console.log("create category");
        },
        createCategoryComplete: function () {
            this.ifAddCat = false;
            console.log("create category completed");
        },


        deletePostRoot: function () {
            this.ifDelPost = true;
            console.log("deleted post");
        },
        deletePostComplete: function () {
            this.ifDelPost = false;
            console.log("delete post completed");
        },
        editPostRoot: function (postName, description, category) {
            this.ifEditPost = true;
            this.postName = postName;
            this.description = description;
            this.category = category;
            console.log("edited post");
        },
        editPostComplete: function () {
            this.ifEditPost = false;
            console.log("edit completed");
        },
        createPostRoot: function (postName, description, category) {
            this.ifAddPost = true;
            this.postName = postName;
            this.description = description;
            this.category = category;
            console.log("created post");
        },
        createPostComplete: function () {
            this.ifAddPost = false;
            console.log("create post completed");
        }
    },

    watch: {
        '$route'(to, from) {
            document.title = to.meta.title;
        }
    },

}).$mount("#crudapp");


//get button data-id
$("#delete-category-modal").on("show.bs.modal", function (e) {
    //delete category 
    $("#delete-category-btn").on("click", function (e) {
        app.deleteCategoryRoot();
        setTimeout(function () {
            $('#delete-category-modal').modal('hide');
        }, 100);
    });
});

//delete post 
$("#delete-post-modal").on("show.bs.modal", function (e) {
    $("#delete-post-btn").on("click", function (e) {
        app.deletePostRoot();
        setTimeout(function () {
            $('#delete-post-modal').modal('hide');
        }, 100);
    });
});

//edit category 
$("#edit-category-modal").on("show.bs.modal", function (e) {
    $("#edit-category-btn").on("click", function (e) {
        $("#categoryEditForm").submit(function (event) {
            event.preventDefault();
            let name = $("input[name='name']", this).val();
            app.editCategoryRoot(name);
            console.log(name);
        });

        setTimeout(function () {
            $('#edit-category-modal').modal('hide');
        }, 100);
    });
});

//edit post 
$("#edit-post-modal").on("show.bs.modal", function (e) {
    if ($('#innerSelectedEdit')[0] == undefined) {
        let $select = $('<select/>', {
            'class': "selectpicker",
            'id': "innerSelectedEdit",
            'multiple': ""
        });
        for (let i = 0; i < categories.length; i++) {
            $select.append('<option value=' + categories[i].name + '>' + categories[i].name + '</option>');
        }
        $('#editFormSelected').append($select).selectpicker('refresh');
    }
    if ($('#innerSelectedEdit').childElementCount != categories.length) {
        $('#innerSelectedEdit').remove();
        let $select = $('<select/>', {
            'class': "selectpicker",
            'id': "innerSelectedEdit",
            'multiple': ""
        });
        for (let i = 0; i < categories.length; i++) {
            $select.append('<option value=' + categories[i].name + '>' + categories[i].name + '</option>');
        }
        $('#editFormSelected').append($select).selectpicker('refresh');
    }
    $('#editFormSelected').selectpicker('deselectAll');
    $('#innerSelectedEdit').selectpicker('deselectAll');

    $('#editFormSelected').on("change", function () {
        let categoriesSelected = $('#editFormSelected').val();
        if (categoriesSelected[0] == 'Create new category') {
            setTimeout(function () {
                $('#edit-post-modal').modal('hide');
            }, 100);
            new Promise(function () {
                location.href = 'file:///E:/Flask%20Python%20Freelancing/weDevs%20Assignment/CRUDVueJsNestedModal/app/index.html#/add-category';
                $('#create-category-modal').modal('show');
            }).then(function () {
                setTimeout(function () {
                    $('#edit-post-modal').modal('show');
                }, 100);
            });
        }
    });

    $("#edit-post-btn").on("click", function (e) {
        $("#postEditForm").submit(function (event) {
            let categoriesSelected = $('#innerSelectedEdit').val();
            let name = $("input[name='editNamePost']", this).val();
            let description = $("textarea:input[name='editDescription']", this).val();
            let category = categoriesSelected;
            app.editPostRoot(name, description, category);
            categoriesSelected = [];
            event.preventDefault();
        });

        setTimeout(function () {
            $('#edit-post-modal').modal('hide');
        }, 100);
    });
});

//create a new category
$("#create-category-modal").on("show.bs.modal", function (e) {
    $("#create-category-btn").on("click", function (e) {
        $("#createForm").submit(function (event) {
            let catName = $("input[name='name']", this).val();
            app.createCategoryRoot(catName);
            event.preventDefault();
        });

        setTimeout(function () {
            $('#create-category-modal').modal('hide');
        }, 100);
    });
});

//create a new post
$("#create-post-modal").on("show.bs.modal", function (e) {

    if ($('#innerSelectedCreate')[0] == undefined) {
        let $select = $('<select/>', {
            'class': "selectpicker",
            'id': "innerSelectedCreate",
            'multiple': ""
        });
        for (let i = 0; i < categories.length; i++) {
            $select.append('<option value=' + categories[i].name + '>' + categories[i].name + '</option>');
        }
        $('#createFormSelected').append($select).selectpicker('refresh');
    }
    if ($('#innerSelectedCreate').childElementCount != categories.length) {
        $('#innerSelectedCreate').remove();
        let $select = $('<select/>', {
            'class': "selectpicker",
            'id': "innerSelectedCreate",
            'multiple': ""
        });
        for (let i = 0; i < categories.length; i++) {
            $select.append('<option value=' + categories[i].name + '>' + categories[i].name + '</option>');
        }
        $('#createFormSelected').append($select).selectpicker('refresh');
    }
    $('#createFormSelected').selectpicker('deselectAll');
    $('#innerSelectedCreate').selectpicker('deselectAll');

    $('#createFormSelected').on("change", function () {
        let categoriesSelected = $('#createFormSelected').val();
        if (categoriesSelected[0] == 'Create new category') {
            setTimeout(function () {
                $('#create-post-modal').modal('hide');
            }, 100);
            new Promise(function () {
                location.href = 'file:///E:/Flask%20Python%20Freelancing/weDevs%20Assignment/CRUDVueJsNestedModal/app/index.html#/add-category';
                $('#create-category-modal').modal('show');
            }).then(function () {
                setTimeout(function () {
                    $('#create-post-modal').modal('show');
                }, 100);
            });
        }
    });

    $("#create-post-btn").on("click", function (e) {
        $("#postCreateForm").submit(function (event) {
            let categoriesSelected = $('#innerSelectedCreate').val();
            let name = $("input[name='namePost']", this).val();
            let description = $("textarea:input[name='description']", this).val();
            let category = categoriesSelected;
            app.createPostRoot(name, description, category);
            categoriesSelected = [];
            event.preventDefault();
        });

        setTimeout(function () {
            $('#create-post-modal').modal('hide');
        }, 100);
    });
});
