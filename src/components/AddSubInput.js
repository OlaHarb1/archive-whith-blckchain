import React, {useState} from 'react';

import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure
} from "@nextui-org/react";
import {SCApi} from "../tools/smartContractApi";
import {toast} from "react-toastify";

const AddSubInput = ({studentId, isAddress, isStudent, onADD}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [state, setState] = useState({
        id: studentId,
        [isAddress ? "address" : "warnning"]: ""
    })

    const setData = (e) => {
        setState((prev) => {
            return {
                ...prev,
                [isAddress ? "address" : "warnning"]: e.target.value
            }
        })
    }
    const save = async () => {
        let validate = true;

        if (state[isAddress ? "address" : "warnning"] === '') {
            toast(`${isAddress ? "address" : "warnning"} ist required`)
            validate = false
        }
        if (validate) {
            try {
                if (isAddress) {
                    if (isStudent) {
                        await SCApi.addAddressToStudent({id: state.id, address: state["address"]})
                    } else {
                        await SCApi.addAddressToProfessor({id: state.id, address: state["address"]})
                    }
                } else {
                    await SCApi.addWarningToStudent({id: state.id, warning: state["warnning"]})
                }
            }catch (err){
                toast("you are canceled the operation")
            }

            onADD()

        }

    }
    return (
        <div>
            <div className="flex flex-col gap-2">
                <button onClick={onOpen}
                        className=' hover:text-[#33699E] text-white bg-[#33699E] hover:bg-transparent hover:border-[#33699E] hover:border rounded-full py-1 px-2  '>
                    add {isAddress ? "address" : "warning"}

                </button>

                <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior='inside' size='2xl'>
                    <ModalContent>
                        {(onClose) => (<>
                            <ModalHeader className="flex flex-col gap-1">
                                add {isAddress ? "address" : "warning"}
                            </ModalHeader>
                            <ModalBody>
                                <Input isRequired onChange={setData}
                                       value={state[isAddress ? "address" : "warnning"]} size='lg'
                                       label={isAddress ? "address" : "warning"} color='primary'/>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onPress={() => {
                                    save().then()
                                    onClose()
                                }}>
                                    save
                                </Button>
                            </ModalFooter>
                        </>)}
                    </ModalContent>
                </Modal>
            </div>

        </div>
    );
};

export default AddSubInput;