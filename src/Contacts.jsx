import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getContacts, createContact, updateContact, deleteContact } from "./api";
import './Contacts.css';

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [contactData, setContactData] = useState({ name: "", email: "", number: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchContacts = async () => {
    const response = await getContacts();
    setContacts(response.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateContact(editingId, contactData);
      setEditingId(null);
    } else {
      await createContact(contactData);
    }
    setContactData({ name: "", email: "", number: "" });
    fetchContacts();
  };

  const handleDelete = async (id) => {
    await deleteContact(id);
    fetchContacts();
  };

  const handleEdit = (contact) => {
    setEditingId(contact._id);
    setContactData({ name: contact.name, email: contact.email, number: contact.number });
  };

  return (
    <div className="contacts-container">
      <h2>Contacts</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={contactData.name}
          onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={contactData.email}
          onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={contactData.number}
          onChange={(e) => setContactData({ ...contactData, number: e.target.value })}
          required
        />
        <button type="submit">{editingId ? "Update" : "Add"} Contact</button>
      </form>
      <ul>
        {contacts.map((contact) => (
          <li key={contact._id}>
            {contact.name} - {contact.email} - {contact.number}
            <button onClick={() => handleEdit(contact)}>Edit</button>
            <button onClick={() => handleDelete(contact._id)}>Delete</button>
            <Link to={`/contact/${contact._id}`}>View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Contacts;
