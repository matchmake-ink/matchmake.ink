import { AiOutlineCloseCircle } from "react-icons/ai";

export interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  title?: string;
  onClose?: () => void;
}
export default function Modal({
  children,
  open,
  title = "",
  onClose = () => {},
}: ModalProps) {
  return (
    <>
      <div
        className={`absolute top-0 left-0 w-screen h-screen z-40 tint transition-all ${
          open ? "" : "hidden"
        }`}
      ></div>
      <div
        className={`absolute top-0 left-0 z-50 w-full h-full p-4 transition-all flex align-middle justify-center ${
          open ? "scale-100" : "scale-0"
        }`}
      >
        <div
          className={`${
            open ? "scale-100" : "scale-0"
          } m-auto z-50 transition-all p-4 border border-text bg-secondary-500 rounded-xl max-w-[500px] max-h-[500px]`}
        >
          <div className="flex flex-row">
            <h3 className="w-full mr-4">{title}</h3>
            <button onClick={onClose}>
              <AiOutlineCloseCircle size={24} />
            </button>
          </div>

          {children}
        </div>
      </div>
    </>
  );
}
