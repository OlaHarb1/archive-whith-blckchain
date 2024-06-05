import React, {useState} from "react";
import {
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input,
} from "@nextui-org/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAdd} from "@fortawesome/free-solid-svg-icons";
import {SCApi} from "../../../tools/smartContractApi";
import {toast} from "react-toastify";


const AddEmployee = ({onAdd, isAuthorized = false}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [newEmployee, setNewEmployee] = useState()


    const save = async () => {

       let isExist=false;
        if (newEmployee === undefined) {
            toast("address ist required")
        }
        const employees=await SCApi.getAllEmployee()
        employees.map((employee)=>{
            if(employee===newEmployee){
                isExist=true
            }
        })
        if(isExist){
            toast("this address already exist")
            return;
        }
        if (!isAuthorized) {

            SCApi.addEmployee({address: newEmployee}).then((r) => {
                if (r) {
                    onAdd()
                }
            }).catch((err) => {
                console.log(err)

            })

            return;
        }
        const auths=await SCApi.getAllAuth()
        auths.map((auth)=>{
            if(auth===newEmployee){
                isExist=true
            }
        })
        if(isExist){
            toast("this address already exist")
            return;
        }

        SCApi.addAuth({address: newEmployee}).then((r) => {
            if (r) {
                onAdd()
            }
        }).catch((err) => {
           toast("you are canceled the operation")
        })

    }

    return (
        <div className="flex flex-col gap-2">
            <button onClick={onOpen}
                    className='fixed text-[#33699f] border-[#33699f] right-0 bottom-0 mr-10 mb-10 border py-3 px-4 bg-gray-100 hover:text-white hover:bg-[#33699f]  rounded-full '>
                <FontAwesomeIcon size='lg' icon={faAdd}/>
            </button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior='inside' size='2xl'>
                <ModalContent>
                    {(onClose) => (<>
                        <ModalHeader className="flex flex-col gap-1">
                            {isAuthorized ? " Add new Authorized" : "Add New Employee"}
                        </ModalHeader>
                        <ModalBody>
                            <Input isRequired onChange={(e) => setNewEmployee(e.target.value)}
                                   value={newEmployee} size='lg' label='Address' color='primary'/>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onPress={() => {
                                save()
                                onClose()
                            }}>
                                save
                            </Button>
                        </ModalFooter>
                    </>)}
                </ModalContent>
            </Modal>
        </div>);
}
export default AddEmployee
