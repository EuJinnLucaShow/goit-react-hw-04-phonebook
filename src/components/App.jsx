import { useState, useEffect } from "react";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import { Container, Title, Heading2 } from './App.styled';

function App() {
  const initialContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  const [contacts, setContacts] = useState(initialContacts);
  const [filter, setFilter] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const contactsData = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contactsData);

    if (parsedContacts && parsedContacts.length !== contacts.length) {
      setContacts(parsedContacts);
    }  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    } else {
      setIsLoaded(true);
    }
  }, [contacts, isLoaded]);

  const addContact = (newContact) => {
  setContacts((prevContacts) => [...prevContacts, newContact]);
  setIsLoaded(false);
};

const deleteContact = (id) => {
  setContacts((prevContacts) =>
    prevContacts.filter((contact) => contact.id !== id)
  );
  setIsLoaded(false);
};

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container>
      <Title>Phonebook📱</Title>
      <ContactForm addContact={addContact} contacts={contacts} />

      <Heading2>Contacts</Heading2>
      <Filter filter={filter} setFilter={setFilter} />
      <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
    </Container>
  );
}

export default App;
