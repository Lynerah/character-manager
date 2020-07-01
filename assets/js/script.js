const axios = require('axios').default; // avec intellisense/autocomplete
const regeneratorRuntime = require("regenerator-runtime");

// Définition de la classe Character
class Character {
    constructor (name, shortDescription, description, image) {
	    this.name = name;
	    this.shortDescription = shortDescription;
	    this.description = description;
	    this.image = image;
	}
}

// Fonction principale
(function main() {

	// Déclaration de variables globales du programme
	let charactersID = [];
	let viewButtons = [];
	let editButtons = [];
	let deleteButtons = [];

	let editedCharacter = {};

	// Récupération d'éléments HTML
	const viewWindow = document.getElementById("overlayView");
	const createWindow = document.getElementById("overlayCreation");
	const editWindow = document.getElementById("overlayEdit");

	// Lancement du programme

	// Génération des cartes contenant les données de l'API
	axiosGetAllExistingCharacters()
	.then(charactersArray => {
		displayAllCharacters(charactersArray.data);
		//console.table(charactersID);
		getAllButtons();
	})
	.catch(error => console.error(error));

	// Boutons d'action

	document.getElementById("btnCreation").addEventListener("click", () => {
		displayWindow(createWindow);
	});

	document.getElementById("createSubmitButton2").addEventListener("click", () => {
		const characterToAdd = createOneCharacter();

		console.log(characterToAdd.name);

		axiosPostOneCharacter(characterToAdd)
		.then(character => {
			console.table(character.data);
			//undisplayWindow(createWindow);
			window.location.reload(false);
		})
		.catch(error => console.error(error));
	});

	document.getElementById("editSubmitButton").addEventListener("click", () => {
		editedCharacter = changeValuesToEditOneCharacter(editedCharacter);

		axiosUpdateOneCharacter(editedCharacter)
		.then(() => {
			undisplayWindow(editWindow);
			window.location.reload(false);
		})
		.catch(error => console.error(error));
	});

	document.getElementById("createImgSelector2").addEventListener("change", () => {
		readImage(document.getElementById("createImgSelector2"), document.getElementById("createImgPreview2"));		
	});

	document.getElementById("editImgSelector").addEventListener("change", () => {
		readImage(document.getElementById("editImgSelector"), document.getElementById("editImgPreview"));
	});

	/*document.getElementById("editDeleteButton").addEventListener("click", () => {
		deleteOneCharacter(editedCharacter.id);
		undisplayWindow(editWindow);
	});*/

	document.getElementById("closeView").addEventListener("click", () => {
		undisplayWindow(viewWindow);
		undisplayWindow(createWindow);
		undisplayWindow(editWindow);
	});

	// FIN MAIN PROGRAM


	// FUNCTIONS API CALLS

	async function axiosGetAllExistingCharacters() {
		try {
			return await axios.get("https://character-database.becode.xyz/characters");
		} 
		catch (error) {
			console.error(error);
		}
	}

	async function axiosGetOneCharacter(characterID) {
		try {
			return await axios.get("https://character-database.becode.xyz/characters" + "/" + characterID);
		}
		catch (error) {
			console.error(error);
		}
	}

	async function axiosPostOneCharacter(newCharacter) {
		try {

			return await axios.post("https://character-database.becode.xyz/characters", {
				name: newCharacter.name,
				shortDescription: newCharacter.shortDescription,
				description: newCharacter.description,
				image: newCharacter.image
			});
		}
		catch (error)
		{
			console.error(error);
		}
	}

	async function axiosUpdateOneCharacter(characterToUpdate) {
		try {

			return await axios.put("https://character-database.becode.xyz/characters" + "/" + characterToUpdate.id, {
				name: characterToUpdate.name,
				shortDescription: characterToUpdate.shortDescription,
				description: characterToUpdate.description,
				image: characterToUpdate.image
			});
		}
		catch (error)
		{
			console.error(error);
		}
	}

	async function axiosDeleteOneCharacter(characterToDelete) {
		try {

			return await axios.delete("https://character-database.becode.xyz/characters" + "/" + characterToDelete);
		}
		catch (error)
		{
			console.error(error);
		}
	}

	// FUNCTIONS MANAGING DATA

	function getAllButtons()
	{
		viewButtons = document.getElementsByClassName("viewHero");
		editButtons = document.getElementsByClassName("editHero");
		deleteButtons = document.getElementsByClassName("deleteHero");

		for (let i = 0; i < viewButtons.length; i++)
		{
			viewButtons[i].addEventListener("click", async () => {
				displayWindow(viewWindow);
				const characterToView = await axiosGetOneCharacter(charactersID[i]);
				displayOneCharacter(characterToView.data);
			});

			editButtons[i].addEventListener("click", async () => {
				displayWindow(editWindow);
				const characterToEdit = await axiosGetOneCharacter(charactersID[i]);
				retrieveValuesToEditOneCharacter(characterToEdit.data);
			});

			deleteButtons[i].addEventListener("click", async () => {
				return await deleteOneCharacter(i);
			});
		}
	}

	function displayAllCharacters(charactersArray)
	{	
		const charactersElement = document.getElementById("charactersBoard");
		const template = document.getElementById("tpl-card");

		charactersArray.forEach(character => {
			const clone = template.content.cloneNode(true);

			clone.querySelector(".card-title").innerHTML = character.name;
			clone.querySelector(".card-text").innerHTML = character.shortDescription;
			clone.querySelector(".card-img").src = "data:image/*;base64," + character.image;
			charactersID.push(character.id);

			charactersElement.appendChild(clone);
		});
		
	}

	function displayOneCharacter(character)
	{	
		document.querySelector(".viewCardTitle").innerHTML = character.name;
		document.querySelector(".viewCardText").innerHTML = character.shortDescription;
		document.querySelector(".viewCardLongtext").innerHTML = character.description;
		document.querySelector(".viewCardImg").src = "data:image/*;base64," + character.image;
	}

	function retrieveValuesToEditOneCharacter(character)
	{	
		document.getElementById("editName").value = character.name;
		document.getElementById("editShortDescription").value = character.shortDescription;
		document.getElementById("editDescription").value = character.description;
		document.getElementById("editImagePreview").src = "data:image/*;base64," + character.image;

		characterToEdit = character;
	}

		// répétition sélection d'image et récupération base64
		
	function changeValuesToEditOneCharacter(character)
	{
		// vérification que les champs soient tous remplis
		const nameInput = document.getElementById("editName").value;
		const shortDescriptionInput = document.getElementById("editShortDescription").value;
		const descriptionInput = document.getElementById("editDescription").value;

		const imagePreviewElement = document.getElementById("editImgPreview");

		console.log(nameInput);
		console.log(shortDescriptionInput);
		console.log(descriptionInput);

		const base64String = imagePreviewElement.src
		.replace('data:', '')
        .replace(/^.+,/, '');
	    console.log("dans fonction:", base64String);

	    character.name = nameInput;
	    character.shortDescription = shortDescriptionInput;
	    character.description = descriptionInput;
	    character.image = base64String;

		return character;
	}

	async function deleteOneCharacter(index)
	{	
		let response = confirm("Are you sure you want to delete this character?");

		if(response === true)
		{
			const deletedCharacter = await axiosDeleteOneCharacter(charactersID[index]);
			window.location.reload(false);
			return deletedCharacter;
		}
		else
		{
			alert("The character has not been deleted.");
		}
	}

	function createOneCharacter()
	{
		const nameInput = document.getElementById("createName2").value;
		const shortDescriptionInput = document.getElementById("createShortDescription2").value;
		const descriptionInput = document.getElementById("createDescription2").value;

		const imagePreviewElement = document.getElementById("createImgPreview2");

		console.log(nameInput);
		console.log(shortDescriptionInput);
		console.log(descriptionInput);

		const base64String = imagePreviewElement.src
		.replace('data:', '')
        .replace(/^.+,/, '');

		const newCharacter = new Character(nameInput, shortDescriptionInput, descriptionInput, base64String);

		return newCharacter;
	}

	function readImage(imageSelector, imagePreview)
	{
		const imageSelectorInput = imageSelector.files[0];
		const imagePreviewElement = imagePreview;

		const reader = new FileReader();
		reader.readAsDataURL(imageSelectorInput);
		reader.addEventListener('load', (event) => {
		    imagePreviewElement.src = event.target.result;
		});
	}

	function displayWindow(window)
	{
	    window.style.display = "block";
	}

	function undisplayWindow(window)
	{
	    window.style.display = "none";
	}

})();


/*

Character object

id: The identifier of the character as an UUID. // auto
name: The name of the character.
shortDescription: A short description of the character.
description: A long description of the character in Markdown.
image: An image of the character in Base64. 
When creating or modifying a character this image will always be resized to 100x100 px and recompressed to JPEG.


GET /characters[?name=:name]
Returns a complete list of all the characters.

Facultative name parameter filters on the name.

GET /characters/:id
Returns a character by id.

POST /characters
Only takes JSON as input.

Creates a new character.

Returns the newly created character id.

PUT /characters/:id
Only takes JSON as input.

Updates a character.

DELETE /characters/:id
Deletes a character.

*/