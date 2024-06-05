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

const CheckAddressIfEmployee = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [address, setAddress] = useState('')
    const save=()=>{
        SCApi.checkEmp({address:address}).then((r)=>{

                toast(`this address is ${r?"":"not"}  employee`)
            setAddress('')

        })
    }

    return (
        <div>
            <div className="flex flex-col gap-2">
                <button onClick={onOpen}
                        className="text-lg hover:text-[#33699F]  px-4 py-3 border rounded-full  ml-2 text-white bg-[#33699F] hover:bg-white hover:border-[#33699F]">
                    Check Employee address

                </button>

                <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior='inside' size='2xl'>
                    <ModalContent>
                        {(onClose) => (<>
                            <ModalHeader className="flex flex-col gap-1">
                                Check Employee address
                            </ModalHeader>
                            <ModalBody>
                                <Input isRequired onChange={(e) => setAddress(e.target.value)}
                                       value={address} size='lg'
                                       label='enter address' color='primary'/>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onPress={() => {
                                    save()
                                    onClose()
                                }}>
                                    check
                                </Button>
                            </ModalFooter>
                        </>)}
                    </ModalContent>
                </Modal>
            </div>

        </div>
    );
};

export default CheckAddressIfEmployee;