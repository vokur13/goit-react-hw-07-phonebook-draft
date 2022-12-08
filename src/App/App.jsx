import { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts, addContact, deleteContact } from 'redux/operations';
import {
  getError,
  getIsLoading,
  getContacts,
  getFilter,
} from 'redux/selectors';
// import { getContacts } from 'redux/selectors';
import { Box } from '../components/Box';
import { ContactForm } from '../components/ContactForm';
import { Filter } from '../components/Filter';
import { ContactList } from '../components/ContactList';
import { nanoid } from 'nanoid';

// import { add, remove, findContact } from '../redux/contacts/contactsSlice';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  const items = useSelector(getContacts);
  const filter = useSelector(getFilter);

  // Получаем части состояния
  // const { items, isLoading, error } = useSelector(getContacts);
  // Вызываем операцию
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  // const contacts = useSelector(state => state.contacts.contacts);
  // const filter = useSelector(state => state.contacts.filter);

  function handleSubmit({ name, phone }) {
    const checkName = items.some(
      item => item.name.toLowerCase().trim() === name.toLowerCase().trim()
    );
    checkName
      ? alert(`${name} is already in contacts`)
      : dispatch(addContact({ id: nanoid(), name, phone }));
  }

  function onFilterChange([value]) {
    !value ? dispatch(findContact((value = ''))) : dispatch(findContact(value));
  }

  // const filteredContacts = useMemo(() => {
  //   if (filter) {
  //     return contacts.filter(item => {
  //       return item.name
  //         .toLowerCase()
  //         .trim()
  //         .includes(filter.toLowerCase().trim());
  //     });
  //   }
  //   return contacts;
  // }, [contacts, filter]);

  function handleDelete(itemID) {
    dispatch(deleteContact(itemID));
  }

  return (
    <Box width={1} p={4} bg="bgBasic" as="main">
      {error && <p>{error}</p>}
      <h1>Phonebook</h1>
      <ContactForm onFormSubmit={handleSubmit} />
      <h2>Contacts</h2>
      <Filter onChange={onFilterChange} />
      {/* <Filter /> */}
      {/* <ContactList onDelete={deleteItem} list={filteredContacts} /> */}
      {isLoading && <p>Loading contacts...</p>}
      {items && items.length > 0 && (
        <ContactList onDelete={handleDelete} list={items} />
      )}
      {/* <ContactList list={items} /> */}
    </Box>
    // <>
    //   {isLoading && <p>Loading contacts...</p>}
    //   {error && <p>{error}</p>}
    //   <p>{items.length > 0 && JSON.stringify(items, null, 2)}</p>
    // </>
  );
};
