import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { CiCirclePlus, CiSearch } from "react-icons/ci";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Logo from "./assets/logo.png";
import AddAndUpdate from "./components/AddAndUpdate";
import Card from "./components/Card";
import Not from "./components/Not";
import { db } from "./config/firebase";
import useModal from "./hook/useModal";

function App() {
  const [contact, setContact] = useState([]);
  const { openModal, onOpen, onClose } = useModal();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactRef = collection(db, "contact");
        onSnapshot(contactRef, (snapshot) => {
          const contactList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContact(contactList);
          return contactList;
        });
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, "contact");

    onSnapshot(contactsRef, (snapshot) => {
      const contactList = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactList.filter((contact) => {
        return contact.name.toLowerCase().includes(value.toLowerCase());
      });

      setContact(filteredContacts);
    });
  };

  return (
    <>
      <div className="mx-auto max-w-[500px] px-4">
        <div className="flex justify-center items-center p-9 shadow-lg mb-5">
          <img src={Logo} alt="" className="w-16" />
        </div>
        <div className="p-4 relative flex items-center flex-grow gap-4">
          <input
            onChange={filterContacts}
            type="text"
            className="h-10 flex-grow rounded-md bg-transparent border border-dark py-2 pl-10 text-gray-500"
          />
          <div className="absolute ml-2">
            <CiSearch className="text-3xl text-gray-500 cursor-pointer" />
          </div>
          <CiCirclePlus
            onClick={onOpen}
            className="text-3xl text-gray-500 cursor-pointer"
          />
        </div>
        <div>
          {contact.length <= 0 ? (
            <Not />
          ) : (
            contact.map((contact) => {
              return <Card key={contact.id} contact={contact} />;
            })
          )}
        </div>
        <ToastContainer position="bottom-center" />
        <AddAndUpdate openModal={openModal} onClose={onClose} />
      </div>
    </>
  );
}

export default App;
