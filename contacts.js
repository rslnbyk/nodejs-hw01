const fs = require("fs").promises;
const path = require("node:path");

const contactsPath = path.resolve(__dirname, "./db/contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  const db = JSON.parse(contacts);
  return db;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  console.log(contacts.filter((el) => el.id === contactId));
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  contacts.splice(
    contacts.findIndex((el) => el.id === contactId),
    1
  );
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newId = Number(contacts[contacts.length - 1].id) + 1;
  contacts.push({ id: newId.toString(), name, email, phone });
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
}

module.exports = { listContacts, getContactById, removeContact, addContact };
