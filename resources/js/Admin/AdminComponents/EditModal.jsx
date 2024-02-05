import CloseIcon from "@/Components/icons/CloseIcon";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

const EditModal = ({ isOpen, onClose, title, content }) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog onClose={onClose}>
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30 z-10" />
                <div className="w-auto min-w-[35%] max-w-[50%] z-20 fixed bg-white p-6 border rounded-l-xl top-0 right-0 h-full">
                    <p className="text-2xl p-2 border-b border-b-black mb-2">
                        {title}
                    </p>
                    {content}
                    <span onClick={onClose} className="cursor-pointer">
                        {/* Assuming this is your close icon */}
                        <CloseIcon
                            height={"2rem"}
                            width={"2rem"}
                            className={
                                "absolute top-8 right-6 fill-rose-800 cursor-pointer hover:scale-125"
                            }
                        />
                    </span>
                </div>
            </Dialog>
        </Transition>
    );
};

export default EditModal;
