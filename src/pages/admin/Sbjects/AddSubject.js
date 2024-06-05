import React, {useState} from 'react';
import {
    Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure
} from "@nextui-org/react";
import {faAdd} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {SCApi} from "../../../tools/smartContractApi";
import {toast} from "react-toastify";



const AddSubject = ({onAdd,subjectName}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [data, setData] = useState({
        id:"",
        name: "", level: "", weekly_hour: "", college: subjectName

    })
    const onChangeInput = (e) => {
        setData((prev) => {
            return {
                ...prev, [e.target.name]: e.target.value
            }
        })
    }
    const save = async () => {
        let validate = true
        Object.entries(data).map(([k, v]) => {
            if (v === '') {
                validate = false
                toast(`${k} required`)
            }
        })
        let isExist = false
        const r = await SCApi.getAllProfessors()
        if (r) {
            r.forEach((subject) => {

                if (parseInt(subject.id) === parseInt(data.id)) {
                    isExist = true


                }
            })
        }
        if(isExist){
         toast("id is already exist")
        }
        if (validate &&!isExist) {
            SCApi.addSubject({
                id: data.id, name: data.name, weekly_hour: data.weekly_hour, level: data.level, college: data.college
            }).then((r) => {
            }).catch((err)=>{
                toast("you are canceled the operation")

            })
            onAdd()
            setData({id: "", name: "", level: "", weekly_hour: "", college: subjectName}
            )
        }


    }

    return (<div className="flex flex-col gap-2">
        <button onClick={onOpen}
                className='fixed text-[#33699f] border-[#33699f] right-0 bottom-0 mr-10 mb-10 border py-3 px-4 bg-gray-100 hover:text-white hover:bg-[#33699f]  rounded-full '>
            <FontAwesomeIcon size='lg' icon={faAdd}/>
        </button>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior='inside' size='2xl'>
            <ModalContent>
                {(onClose) => (<>
                    <ModalHeader className="flex flex-col gap-1">
                        Add New Subject
                    </ModalHeader>
                    <ModalBody>

                        <Input key="id" name="id" isRequired onChange={onChangeInput} value={data.id} size='lg' label="Id"
                               color='primary'/>
                        <Input key="name" name="name" isRequired onChange={onChangeInput} value={data.name} size='lg' label="Name"
                               color='primary'/>
                        <Input key="level" name="level" isRequired onChange={onChangeInput} value={data.level} size='lg' label="Level"
                               color='primary'/>
                        <Input key="weekly_hour" name="weekly_hour" isRequired onChange={onChangeInput} value={data.weekly_hour} size='lg' label=" Weekly Hour"
                               color='primary'/>

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

};

export default AddSubject;