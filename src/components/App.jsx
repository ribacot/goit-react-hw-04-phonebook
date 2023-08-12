import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import Container from './container/Container';
import { FormPhone } from './form/FormPhone';
import { ContactsList } from './contacts_list/ContactsList';
import Search from './search/Search';

const contactsLs = 'contacts';
export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(contactsLs)) || []
  );
  const [filter, setFilter] = useState('');
  useEffect(
    () => localStorage.setItem(contactsLs, JSON.stringify(contacts)),

    [contacts]
  );

  const hendleSubmit = ({ name, number }) => {
    setFilter('');
    setContacts(prev => [...prev, { name, number, id: nanoid() }]);
  };

  const deleteContact = contactId => {
    setContacts(prev => prev.filter(contact => contact.id !== contactId));
  };

  const hendleSearch = e => {
    const { value } = e.target;
    setFilter(value.toLowerCase().trim());
  };

  const getFilteredContacts = () => {
    return contacts.filter(({ name }) => name.toLowerCase().includes(filter));
  };

  const deleteAllContact = () => {
    setContacts([]);
  };

  return (
    <>
      <Container title="Phone book">
        <FormPhone onSubmit={hendleSubmit} contacts={contacts} />
      </Container>
      <Container title="Contacts">
        {contacts.length ? (
          <>
            <Search onClick={hendleSearch} searchName={filter} />
            {getFilteredContacts().length ? (
              <ContactsList
                contacts={getFilteredContacts()}
                onDeleteContact={deleteContact}
                onDeleteAllContact={deleteAllContact}
              ></ContactsList>
            ) : (
              <p className="not_found">Not found contacts</p>
            )}
          </>
        ) : (
          <p className="not_found">Phone book is empty</p>
        )}
      </Container>
    </>
  );
};
