import "./App.css";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import Logo from "./assets/logo.png";
import { db } from "./config/firebase";
import { CiSearch } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";

function App() {
  const [contact, setContact] = useState([]);

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

  console.log(contact);

  return (
    <>
      <div className="mx-auto max-w-[500px] px-4">
        <div className="flex justify-center items-center p-9 shadow-lg mb-5">
          <img src={Logo} alt="" className="w-16" />
        </div>
        <div className="p-4 relative flex items-center flex-grow gap-4">
          <input
            type="text"
            className="h-10 flex-grow rounded-md bg-transparent border border-dark py-2 pl-10 text-gray-500"
          />
          <div className="absolute ml-2">
            <CiSearch className="text-3xl text-gray-500 cursor-pointer" />
          </div>
          <CiCirclePlus className="text-3xl text-gray-500 cursor-pointer" />
        </div>
      </div>
    </>
  );
}

export default App;
