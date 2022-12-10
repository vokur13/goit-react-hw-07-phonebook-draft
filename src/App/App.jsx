import { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  contactsOperations,
  contactsSelectors,
  contactsSlice,
} from 'redux/contacts';
import { Box } from 'components/Box';
import { ContactForm } from 'components/ContactForm';
import { Filter } from 'components/Filter';
import { ContactList } from 'components/ContactList';
import { nanoid } from 'nanoid';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(contactsSelectors.selectIsLoading);
  const error = useSelector(contactsSelectors.selectError);
  const items = useSelector(contactsSelectors.selectContacts);
  const filter = useSelector(contactsSelectors.selectFilter);

  useEffect(() => {
    dispatch(contactsOperations.fetchContacts());
  }, [dispatch]);

  function handleSubmit({ name, phone }) {
    const checkName = items.some(
      item => item.name.toLowerCase().trim() === name.toLowerCase().trim()
    );
    checkName
      ? alert(`${name} is already in contacts`)
      : dispatch(contactsOperations.addContact({ id: nanoid(), name, phone }));
  }

  function onFilterChange([value]) {
    !value
      ? dispatch(contactsSlice.findContact((value = '')))
      : dispatch(contactsSlice.findContact(value));
  }

  const filteredItems = useMemo(() => {
    if (filter) {
      return items.filter(item => {
        return item.name
          .toLowerCase()
          .trim()
          .includes(filter.toLowerCase().trim());
      });
    }
    return items;
  }, [filter, items]);

  function handleDelete(itemID) {
    dispatch(contactsOperations.deleteContact(itemID));
  }

  return (
    <Box width={1} p={4} bg="bgBasic" as="main">
      {error && <p>{error}</p>}
      <h1>Phonebook</h1>
      <ContactForm onFormSubmit={handleSubmit} />
      <h2>Contacts</h2>
      <Filter onChange={onFilterChange} />
      {isLoading && <p>Loading contacts...</p>}
      {items && items.length > 0 && (
        <ContactList onDelete={handleDelete} list={filteredItems} />
      )}
    </Box>
  );
};
