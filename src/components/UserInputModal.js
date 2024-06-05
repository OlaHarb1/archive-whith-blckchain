import React from 'react';
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader, Select, SelectItem,
    Switch,
    useDisclosure
} from "@nextui-org/react";
import useUserAddition from "../hooks/useUserAddition";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAdd, faMars, faPen, faVenus} from "@fortawesome/free-solid-svg-icons";
import colleges from "../constant/collages.json";

const UserInputModal = ({onEdit=null,onAdd=null,asProfessor = false, isAdd = false, init = null}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {data, save, onChangeInput, setData} = useUserAddition({onEdit:onEdit,onAdd:onAdd,isProfessor: asProfessor, init: init});
    return (<div className="flex flex-col gap-2">
        <button onClick={onOpen}
                className='fixed text-[#33699f] border-[#33699f] right-0 bottom-0 mr-10 mb-10 border py-3 px-4 bg-gray-100 hover:text-white hover:bg-[#33699f]  rounded-full '>
            {isAdd ? <FontAwesomeIcon size='lg' icon={faAdd}/> : <FontAwesomeIcon icon={faPen}/>}
        </button>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior='inside' size='3xl'>
            <ModalContent>
                {(onClose) => (<>
                    <ModalHeader className="flex flex-col gap-1">
                        {isAdd ? "Add" : "Edit"} New {asProfessor ? "Professor" : "Student"}
                    </ModalHeader>
                    <ModalBody>
                        {
                            Object.entries({
                                id: "Id",
                                firstName: "First Name",
                                lastName: "Last Name",
                                fatherName: "Father Name",
                                motherName: "Mother Name",
                                email: "Email",
                                mobileNumber: "Mobile Number",
                                specialization: "Specialization"
                            }).map(([k, v], i) => {
                                if (!isAdd && k === "id")return <div key={`${i}-id`}></div>
                                    if (!asProfessor && k === "specialization") return <div
                                        key={`${i}-specialization`}></div>;
                                return <Input type={k==="email"?"email":"text"}  key={`${isAdd ? "Add" : "Edit"} - ${i} - ${k}`} name={k}
                                              isRequired onChange={onChangeInput} value={data[k]} size='lg' label={v}
                                              color='primary'/>
                            })
                        }

                        <Input isRequired name="dateOfBirth" onChange={onChangeInput}
                               type="date" value={data.dateOfBirth} size='lg' label="Birth Date"
                               color="primary"/>
                        {/*<DatePicker name="dateOfBirth" isRequired color='primary'*/}
                        {/*            value={data.dateOfBirth ? parseDate(data.dateOfBirth) : null}*/}
                        {/*            onChange={(e) => onChangeInput( e.toString())} label="Birth Date"/>*/}


                        <Select required
                                label="College Name"
                                className="w-full"
                                color="primary"
                                selectedKeys={[data.collegeName]}
                                onSelectionChange={(e) => {
                                    const collegeName = e.anchorKey;
                                    setData((prev) => {
                                        return {
                                            ...prev,
                                            collegeName
                                        }
                                    })
                                }}
                        >
                            {colleges.map((college) => (
                                <SelectItem key={`${college.slug}`} value={college.slug}>
                                    {college.name}
                                </SelectItem>
                            ))}
                        </Select>

                        <div className="flex gap-2 justify-center">
                            <p>female</p>
                            <Switch defaultChecked={data.gender === "female" } onChange={(e) => {

                                setData((prev) => {
                                    return {
                                        ...prev, gender: e.target.checked ? "male" : "female"
                                    }
                                })
                            }}

                                    size="lg"
                                    color="primary"
                                    startContent={<FontAwesomeIcon size='lg' color="red" icon={faVenus}/>}
                                    endContent={<FontAwesomeIcon size='lg' color='green' icon={faMars}/>}
                            >
                            </Switch>
                            <p>male</p>
                        </div>


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

export default UserInputModal;