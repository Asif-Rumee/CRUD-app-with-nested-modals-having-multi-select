# Que: 4 
Pick any CSS framework. Create a CRUD using vue-router for two resources: Posts and Categories. A post belongs to multiple categories.

Conditions: Create and Edit forms should be within modals. While editing a Post, user should be able to update the category using a multi-select (because a post can have multiple categories) and the first item of that dropdown should be “Create New Category” so that the user can create a category on the fly. Visit this link to get a clearer idea: http://tareq.in/Ij0S77

If the user selects “Create New Category”, the modal that you’ve created for a new category earlier should open within your current Edit Post modal. User will create the category on-the-fly and after creating the category, the Create Category modal should now close and the newly created category will be automatically appended to the multi-select items and should also be selected along with the old ones. Now the user should click the save button on the “Edit Post” modal and the Post will be updated accordingly.

For data storage, you can use in-memory (array) or localStorage or any back-end you like.
