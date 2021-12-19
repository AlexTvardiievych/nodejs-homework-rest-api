const path = require("path");
const fs = require("fs").promises;
const generateUniqueId = require("generate-unique-id");
const contactsPath = path.resolve("./model/contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf8");
  const res = JSON.parse(contacts);
  return res;
}

const getContactById = async (contactId) => {
  const parsedContacts = await listContacts();
  const contacts = parsedContacts.find((contact) => contact.id === Number(contactId));

  return contacts;
}

const removeContact = async (contactId) => {
  const contactsCheck = await getContactById(contactId);

  if (!contactsCheck)
    return undefined;

  const parsedContacts = await listContacts();

  const updatedContacts = parsedContacts.filter((contact) =>
    contact.id !== Number(contactId)
  );


  fs.writeFile(contactsPath, JSON.stringify(updatedContacts), "utf8");

  return { message: "Contact deleted" };
}

const addContact = async (newContactArgs) => {

  const contacts = await listContacts();
  const id = Number(generateUniqueId({ length: 5, useLetters: false }));
  const newContact = { "id": id, "name": newContactArgs.name, "email": newContactArgs.email, "phone": newContactArgs.phone };
  const updatedContacts = JSON.stringify([...contacts, newContact]);

  fs.writeFile(contactsPath, updatedContacts, "utf8");

  return newContact;
}

const updateContact = async (contactId, body) => {
  let contactsList = await listContacts();
  const contactIndex = contactsList.findIndex((contact) => contact.id === Number(contactId));

  if (contactIndex === -1)
    return undefined;

  contactsList[contactIndex] = { ...contactsList[contactIndex], ...body };
  fs.writeFile(contactsPath, JSON.stringify(contactsList), "utf8");

  return contactsList[contactIndex];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
