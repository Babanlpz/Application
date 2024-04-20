import { addDoc, collection, updateDoc } from "firebase/firestore";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { db } from "../config/firebase";
import Modal from "./Modal";

const contactSchema = Yup.object().shape({
  name: Yup.string().required("Nom est requis"),
  firstname: Yup.string().required("Prenom est requis"),
  email: Yup.string().email("Email invalide").required("Email est requis"),
  phone: Yup.string().required("Téléphone est requis"),
});

const AddAndUpdate = ({ openModal, onClose, contact, isUpdate }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contact");
      await addDoc(contactRef, contact);
      onClose();
      toast.success("Contact ajouté avec succès");
    } catch (error) {
      console.log(error);
    }
  };
  const updateContact = async (contact, id) => {
    try {
      const contactRef = collection(db, "contact", id);
      await updateDoc(contactRef, contact);
      onClose();
      toast.success("Contact modifier ajouté avec succès");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <Modal openModal={openModal} onClose={onClose}>
          <Formik
            validationSchema={contactSchema}
            initialValues={
              isUpdate
                ? {
                    name: contact.name,
                    firstname: contact.firstname,
                    email: contact.email,
                    phone: contact.phone,
                  }
                : {
                    name: "",
                    firstname: "",
                    email: "",
                    phone: "",
                  }
            }
            onSubmit={(values) => {
              isUpdate ? updateContact(values, contact.id) : addContact(values);
            }}
          >
            <Form className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-gray-700">
                  Nom:
                </label>
                <Field
                  name="name"
                  className="h-10 border border-teal-500 rounded p-4"
                />
                <div className="text-sm text-red-500">
                  <ErrorMessage name="name" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="firstname" className="text-gray-700">
                  Prénom:
                </label>
                <Field
                  name="firstname"
                  className="h-10 border border-teal-500 rounded p-4"
                />
                <div className="text-sm text-red-500">
                  <ErrorMessage name="firstname" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-gray-700">
                  Email:
                </label>
                <Field
                  name="email"
                  className="h-10 border border-teal-500 rounded p-4"
                />
                <div className="text-sm text-red-500">
                  <ErrorMessage name="email" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="phone" className="text-gray-700">
                  Téléphone:
                </label>
                <Field
                  name="phone"
                  className="h-10 border border-teal-500 rounded p-4"
                />
                <div className="text-sm text-red-500">
                  <ErrorMessage name="phone" />
                </div>
              </div>
              <button
                type="submit"
                className="bg-teal-500 px-3 py-1.5 text-white my-3 self-end"
              ></button>
            </Form>
          </Formik>
        </Modal>
      </div>
    </>
  );
};

export default AddAndUpdate;
