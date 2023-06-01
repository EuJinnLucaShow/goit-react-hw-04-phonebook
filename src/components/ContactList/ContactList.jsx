import React from 'react';
import PropTypes from 'prop-types';
// import IconButton from 'components/IconButton/IconButton';
import { ReactComponent as AddIcon } from '../icons/minus-user.svg';
import { ContactItems, ContactName, ContactNumber, Button } from './ContactList.styled'

function ContactList({ contacts, deleteContact }) {
  return (
    <ul>
      {contacts.map((contact) => (
        <ContactItem key={contact.id} contact={contact} deleteContact={deleteContact} />
      ))}
    </ul>
  );
}

function ContactItem({ contact, deleteContact }) {
  const handleDelete = () => {
    deleteContact(contact.id);
  };

  return (
    <ContactItems>
      <ContactName>{contact.name}</ContactName>
      <ContactNumber>{contact.number}</ContactNumber>
      <Button onClick={handleDelete}><AddIcon /></Button>
    </ContactItems>
  );
}

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default ContactList