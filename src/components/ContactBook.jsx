import React, { useState, useEffect } from 'react';

const ContactBook = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  const addContact = newContact => {
    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  const deleteContact = index => {
    const updatedContacts = contacts.filter((contact, i) => i !== index);
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  return (
    <div>
      {' '}
      <h1>Contact Book</h1>{' '}
      <ul>
        {' '}
        {contacts.map((contact, index) => (
          <li key={index}>
            {' '}
            {contact.name} - {contact.phone}{' '}
            <button onClick={() => deleteContact(index)}>Delete</button>{' '}
          </li>
        ))}{' '}
      </ul>{' '}
    </div>
  );
};

export default ContactBook;
