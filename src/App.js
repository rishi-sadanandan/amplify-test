import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
// import { API } from "aws-amplify";
import React, { useEffect, useState } from "react";
import "./App.css";
// import {
//   createNote as createNoteMutation,
//   deleteNote as deleteNoteMutation,
// } from "./graphql/mutations";
// import { listNotes } from "./graphql/queries";
import { DataStore } from "@aws-amplify/datastore";
import { User } from "./models";

// const initialFormState = { name: "", description: "" };
const initialFormState = { email: "" };

function App({ signOut }) {
  // const [notes, setNotes] = useState([]);
  const [models, setModels] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  // useEffect(() => {
  //   fetchNotes();
  // }, []);

  useEffect(() => {
    fetchEmails();
  }, []);

  // async function fetchNotes() {
  //   const apiData = await API.graphql({ query: listNotes });
  //   setNotes(apiData.data.listNotes.items);
  // }

  async function fetchEmails() {
    const modelsList = await DataStore.query(User);
    console.log(modelsList);
    setModels(modelsList.map((model) => model.email));
  }

  // async function createNote() {
  //   if (!formData.name || !formData.description) return;
  //   await API.graphql({
  //     query: createNoteMutation,
  //     variables: { input: formData },
  //   });
  //   setNotes([...notes, formData]);
  //   setFormData(initialFormState);
  // }

  async function addEmail() {
    if (!formData.email) return;
    await DataStore.save(new User({ email: formData.email }));
    setModels([...models, formData.email]);
  }

  function printEmails() {
    console.log("print: ", models);
  }

  // async function deleteNote({ id }) {
  //   const newNotesArray = notes.filter((note) => note.id !== id);
  //   setNotes(newNotesArray);
  //   await API.graphql({
  //     query: deleteNoteMutation,
  //     variables: { input: { id } },
  //   });
  // }

  return (
    <div className="App">
      <h1>My Notes App</h1>
      {/* <input
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Note name"
        value={formData.name}
      />
      <input
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        placeholder="Note description"
        value={formData.description}
      /> */}
      <input
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Email"
        value={formData.email}
      />
      <button onClick={addEmail}>Add Email</button>
      <button onClick={printEmails}>Print Emails</button>
      <div style={{ marginBottom: 30 }}>
        {models.map((email) => (
          <p>{email}</p>
        ))}
      </div>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}

export default withAuthenticator(App);
