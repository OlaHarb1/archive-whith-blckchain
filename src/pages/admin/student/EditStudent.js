import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faMars, faVenus} from "@fortawesome/free-solid-svg-icons";
import {
    Button, DatePicker, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Switch, useDisclosure
} from "@nextui-org/react";
import {parseDate} from "@internationalized/date";
import UserInputModal from "../../../components/UserInputModal";
import userInputModal from "../../../components/UserInputModal";

const EditStudent = ({user ,onEdit}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();


    const [student, setStudent] = useState(user)
    const onChangeInput = (name, e) => {

        setStudent((prev) => {
            return {
                ...prev, [name]: e.target?.value ?? e
            }
        })
    }
    return <UserInputModal onEdit={onEdit}  init={student} />
};

export default EditStudent;