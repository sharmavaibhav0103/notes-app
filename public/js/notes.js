const title = document.querySelector('#title');
const username = document.createTextNode(localStorage.getItem('username'));

const h2 = document.createElement('h2');
title.appendChild(h2.appendChild(username));

//Fetching all the notes 
var notes = [];
const listOfNotes = document.querySelector('.notes-list');

fetch('/allnotes', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
})
.then(res => res.json())
.then(({ notes, msg }) => {
    if(msg){
        location.href = '/index.html'
    }
    if(!notes){
        window.alert('Notes Empty');
    }
    notes.forEach(note => {
        //creating new elements
        let li = document.createElement('li');
        const text = document.createTextNode(note.note);
        li.appendChild(text);
        listOfNotes.appendChild(li);
    })
})

//Saving a note to the database

const noteForm = document.querySelector('#note-form');
noteForm.addEventListener('submit',function(e){
    e.preventDefault();
    const note = e.target.children[0].value;
    notes.push(note);
    const ltext = document.createTextNode(note);
    const li = document.createElement('li');
    li.appendChild(ltext);
    listOfNotes.appendChild(li);
    fetch('/users/addNote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + localStorage.getItem('token') 
        },
        body: JSON.stringify({ note: note})
    })
    .then(res => res.json())
    .then(data => console.log(data));    
})

//Logging users out
const logout = document.querySelector('.logout');
logout.addEventListener('click', () => {
    console.log("loggedout");
    fetch('users/logout',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        location.href = '/index.html';
    })
})
