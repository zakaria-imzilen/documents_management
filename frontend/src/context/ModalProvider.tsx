import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

export const ModalContext = createContext<null | {
  isOpen: { status: boolean; content: ReactNode };
  setIsOpen: Dispatch<
    SetStateAction<
      { status: false; content: null } | { status: true; content: ReactNode }
    >
  >;
}>(null);

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<
    { status: false; content: null } | { status: true; content: ReactNode }
  >({ status: false, content: null });
  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
