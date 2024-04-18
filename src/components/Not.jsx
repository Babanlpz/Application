import Image from "../assets/illustration.svg";

export default function Not() {
  return (
    <div className="flex items-center justify-center gap-4 h-[80vh]">
      <div>
        <img src={Image} alt="Image illustration" width="250" />
        <h3 className="text-2xl font-semibold text-dark text-center my-2">
          Aucuns contacts
        </h3>
      </div>
    </div>
  );
}
