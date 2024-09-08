import React, { Component } from 'react';

class ContactBook extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    const newContact = {
      name: this.state.name,
      number: this.state.number,
      id: Date.now().toString(),
    };

    const existingContact = this.state.contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (existingContact) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
      name: '',
      number: '',
    }));
  };

  handleFind = event => {
    this.setState({ filter: event.target.value });
  };

  handleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  getFilteredContacts() {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  render() {
    const filteredContacts = this.getFilteredContacts();
    const { filter } = this.state;

    return (
      <div>
        <h1>Phonebook</h1>
        <form
          onSubmit={this.handleFormSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <label>Name</label>
          <input
            style={{ width: 'fit-content' }}
            type="text"
            name="name"
            pattern="^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$"
            title="Name may contain only letters, apostrophe, dash, and spaces."
            required
            value={this.state.name}
            onChange={this.handleInputChange}
          />
          <label>Number</label>
          <input
            style={{ width: 'fit-content' }}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses, and can start with +"
            required
            value={this.state.number}
            onChange={this.handleInputChange}
          />
          <button
            type="submit"
            style={{ marginTop: '20px', width: 'fit-content' }}
          >
            Add Contact
          </button>
        </form>
        <h1>Contacts</h1>
        <label style={{ paddingRight: '15px' }}>Find contacts by name</label>
        <input type="text" value={filter} onChange={this.handleFind} />
        <ul>
          {filteredContacts.map(contact => (
            <li key={contact.id}>
              {contact.name}: {contact.number}
              <button
                onClick={() => this.handleDeleteContact(contact.id)}
                style={{ marginLeft: '15px' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ContactBook;
