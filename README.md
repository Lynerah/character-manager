# Character Manager

For our training with Becode, we made a duo application to gather all our favorite characters.
You can create, edit and delete them as you wish.

Below you will find the link to our page:


Our super character manager: [Character Manager](https://lynerah.github.io/character-manager/).

For this job, we had to follow some guidelines.

# Challenge: Character Manager
|Challenge Parameters  |Challenge Details              |
|:---------------------|:------------------------------|
|Repository            |`character-manager`            |
|Challenge type        |`consolidation challenge`           |
|Duration              |`4 days`                       |
|Deadline              |`01/07/2020 17h00`             |
|Deployment method     |`GitHub pages` or `Netlify`                 |
|Group composition     |`Duo`                          |
|Project submition     |[Character-manager form]()|

 

## Objectives 

- Consolidate Javascript knowledge, especially Async/await
- Use an API with HTTP requests

## The job

A Comics fan client would like to manage his favorites characters on a dashboard. He contacts you to create an app that will be able to view, edit, create all his favorites characters. 

In this project, you will use the [Character Database API](https://character-database.becode.xyz/) to make/fetch a Character Manager.  
  
This is a frontend project, you have to care about the appearance of your application and create a custom template.

### Characters list page

This page will be the first one displayed when you open the app. Display the list of all the characters contained inside the database. You can use a table or a list of cards to display them, at your convenience.

Make sure the following features will be present for each character:

* Name
* A short description. Be aware that the `description` field is in Markdown and, of course, we want to display it as HTML in your application.
* An image. **Hint**: [Data URIs](https://css-tricks.com/data-uris/)
* A way to open the corresponding Character
* A way to open the Character editor
* A way to delete the character (You **must** add some kind of confirmation, like "Are you sure you want to delete this character ?")

This page should also contain a button to create a new character.

### Single character 

This page should display a full description of the character. Be aware that the `description` field is in Markdown and, of course, we want to display it as HTML in your application.

### Character creation

When we click on the character creation button in the Characters list page, we should get redirect to this page. This page should contain a form with an input for each of the following fields:

* `name`
* `shortDescription`
* `image` **Hint**: [Reading local files in JavaScript](https://www.html5rocks.com/en/tutorials/file/dndfiles/)
* `description` (You can just let the user enter Markdown but a Wysiwyg editor generating Markdown would be much cooler)

When the form is completed create the character in the API and redirect to the character list page.

### Character editor

This part should be similar to the Character creation page except it allows to edit an existing character.  
It should also contain a button to delete the character. When this deleting an item, display a modal asking for confirmation.


## Constraints

* Your website must be deployed somewhere. We recommend [Github Pages](https://pages.github.com) or [Netlify](https://www.netlify.com), two great (and free) solutions.

## Tips

### HTTP requests

This project ask you to perform HTTP Request. It is recommended to use [axios](https://github.com/axios/axios) to do so you can install it with:

```bash
npm install --save axios
```

Then to import it:

```javascript
const axios = require('axios');
```
Using axios it is strongly recommended to use the [async/await](https://javascript.info/async-await) syntax when working with asynchronous operations.

### Postman

To test APIs rapidly before coding you should use [Postman](https://www.getpostman.com/). 
To start using it today with the Character Database API you can **import** [this Postman collection](https://static.becode.xyz/character-database/characters-database.postman_collection.json).

### CSS frameworks

You can use a *css frameworks* like [Bootstrap](https://getbootstrap.com/) or [Materialize](https://materializecss.com/). 
It will help you to design quickly your application. 

*********


**Create by Laëtitia and Céline.**
