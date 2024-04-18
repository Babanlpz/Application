import { CiEdit } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
import { db } from "../../config/firebase";
import { deleteDoc, doc } from "firebase/firestore";

export default function Card(contact) {
  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contact", id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      key={contact.id}
      className="shadow-lg rounded-lg flex flex-col gap-3 border border-teal-500 p-5 my-5"
    >
      <ul className="flex flex-col">
        <li className="flex items-center bg-teal-500 p-3 text-sm">
          <span className="font-bold text-white mr-2">Nom:</span>
          <span className="text-white">{contact.name}</span>
        </li>
        <li className="flex items-center bg-teal-500 p-3 text-sm">
          <span className="font-bold text-white mr-2">Prenom:</span>
          <span className="text-white">{contact.firstname}</span>
        </li>
        <li className="flex items-center bg-teal-500 p-3 text-sm">
          <span className="font-bold text-white mr-2">email:</span>
          <span className="text-white">{contact.email}</span>
        </li>
        <li className="flex items-center bg-teal-500 p-3 text-sm">
          <span className="font-bold text-white mr-2">Téléphone:</span>
          <span className="text-white">{contact.phone}</span>
        </li>
      </ul>
    </div>
  );
}
