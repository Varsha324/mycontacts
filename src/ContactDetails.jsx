import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getContact } from "./api";
import './ContactDetails.css';

function ContactDetails() {
  const { id } = useParams();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      const response = await getContact(id);
      setContact(response.data);
    };
    fetchContact();
  }, [id]);

  if (!contact) return <p>Loading...</p>;

  return (
    <div className="contactdetails-container">
      <h3>Contact Details</h3>
      <p>Name: <span>{contact.name}</span></p>
      <p>Email: <span>{contact.email}</span></p>
      <p>Phone: <span>{contact.number}</span></p>
    </div>
  );
}

export default ContactDetails;
