import { useState } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from '../ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';

import useLocalStorage from 'hooks/useLocalStorage';

import s from './App.module.css';

function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const formSubmit = ({ name, number }) => {
    const isContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isContact) {
      alert(`${name} is already in contact`);
      return contacts;
    } else {
      setContacts(state => {
        const newContact = {
          id: nanoid(),
          name,
          number,
        };
        return [newContact, ...state];
      });
    }
  };

  const handleFilterChange = e => {
    setFilter(e.currentTarget.value);
  };

  const filteredContacts = value => {
    const filterNormalize = value.toLowerCase();

    return contacts
      .filter(contact => contact.name.toLowerCase().includes(filterNormalize))
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  const contactDelete = id => {
    setContacts(state => state.filter(contact => contact.id !== id));
  };

  return (
    <div className={s['container']}>
      <h1 className={s['title']}>Phonebook</h1>
      <ContactForm onSubmit={formSubmit} />
      <h2 className={s['title']}>Contacts</h2>
      <Filter
        title="Find contact by name"
        onChange={handleFilterChange}
        value={filter}
      />
      <ContactList
        onDelete={contactDelete}
        filteredContacts={filteredContacts(filter)}
      />
    </div>
  );
}

export default App;
