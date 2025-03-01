const { Contacts } = require('../db/contactsModel')
const {
  WrongParametersError
} = require('../helpers/errors')

const getContacts = async ({ owner, page, limit, favorite}) => {
  const paginateOptions = {
    page: page,
    limit: limit > 200 ? 200 : limit,
  };

  const contacts = await Contacts.paginate({owner, favorite}, paginateOptions).then(function (result) {
  return result.docs
})
  return contacts
}

const getContactById = async (id) => {
  const contact = await Contacts.findById(id)
  if (!contact) {
    throw new WrongParametersError('No contact with this id')
  }
  return contact
}
  
const postContact = async ({ owner, name, email, phone }) => {
  const newContact = new Contacts({ owner, name, email, phone })
  await newContact.save()
  return newContact
}
  
const deleteContact = async (id) => {
  const contactToRemove = await Contacts.findByIdAndRemove(id)
  if (!contactToRemove) {
    throw new WrongParametersError('No contact with this id')
  }
}
  
const patchContact = async ({ id, name, email, phone, favorite }) => {
  const contactToChange = await Contacts.findById(id)
  if(!contactToChange) {
    throw new WrongParametersError('No contact with this id')
  }
  const newContact = await Contacts.findByIdAndUpdate(id, { $set: { name, email, phone, favorite } })
  return newContact;
}

const updateStatusContact = async ({ id, favorite }) => {
  const contactToChange = await Contacts.findByIdAndUpdate(id, { $set: { favorite } })
  return contactToChange
  }

module.exports = {
  getContacts,
  getContactById,
  postContact,
  deleteContact,
  patchContact,
  updateStatusContact
}
