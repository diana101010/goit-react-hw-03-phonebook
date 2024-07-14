import React, { useState, useEffect } from 'react';
const ContactBook = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  const addContact = contact => {
    const updatedContacts = [...contacts, contact];
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
      <form
        onSubmit={e => {
          e.preventDefault();
          const name = e.target.elements.name.value;
          const phone = e.target.elements.phone.value;
          addContact({ name, phone });
          e.target.reset();
        }}
      >
        {' '}
        <input type="text" name="name" placeholder="Name" />{' '}
        <input type="text" name="phone" placeholder="Phone" />{' '}
        <button type="submit">Add Contact</button>{' '}
      </form>{' '}
    </div>
  );
};

export default ContactBook;
