import React, {useEffect, useState} from 'react';
import {
    Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure
} from "@nextui-org/react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAdd,} from "@fortawesome/free-solid-svg-icons";
import {SCApi} from "../tools/smartContractApi";
import LoadingPage from "./LoadingPage";
import {toast} from "react-toastify";

const AddMark = ({course=null, collegeName,onAdd}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [loading, setLoading] = useState(true)

    const [students, setStudents] = useState()
    const [data, setData] = useState({
        course_id: course?.id, w_h: course?.weekly_hour, student_id: "", mark: ""
    })

    useEffect(() => {
        getStudent()
    }, [])
    const getStudent = () => {
        SCApi.getAllStudents().then((r) => {
            const s = r.filter((student) => student.collegeName === collegeName)
            setStudents(s)

        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        })
    }
    const save = async () => {
        let validate=true
        Object.entries(data).map(([k,v])=>{
            if(v===''){
                validate=  false
                toast(`${k} required`)
            }
        })
        if(validate){
            if(course!==null){
                try {
                    await SCApi.addMark({
                        course_id: data.course_id,
                        student_id: parseInt(data.student_id),
                        w_h: data.w_h,
                        mark: parseInt(data.mark)
                    })
                }catch (ere){
                    toast("you are canceled the operation")
                }
                    onAdd()
                    setData({
                        course_id: course?.id, w_h: course?.weekly_hour, student_id: "", mark: ""
                    })



            }
        }




    }
    return (<div>
        <div className="flex flex-col gap-2">
            <button onClick={onOpen}
                    className='fixed text-[#33699f] border-[#33699f] right-0 bottom-0 mr-10 mb-10 border py-3 px-4 bg-gray-100 hover:text-white hover:bg-[#33699f]  rounded-full '>
                <FontAwesomeIcon size='lg' icon={faAdd}/>
            </button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior='inside' size='2xl'>
                <ModalContent>
                    {(onClose) => (<>
                        {loading ? <LoadingPage/> : <>
                            <ModalHeader className="flex flex-col gap-1">
                                Add Mark to Student
                            </ModalHeader>
                            <ModalBody>
                                <Select required
                                        label="Student"
                                        className="w-full"
                                        color="primary"
                                        selectedKeys={[data?.student_id]}
                                        onSelectionChange={(e) => {
                                            const student_id = e.anchorKey;
                                            setData((prev) => {
                                                return {
                                                    ...prev, student_id
                                                }
                                            })
                                        }}
                                >
                                    {students?.map((student) => (
                                        <SelectItem key={student?.id} value={student?.id}>
                                            {`${student?.firstName} ${student?.fatherName} ${student?.lastName}`}
                                        </SelectItem>))}
                                </Select>
                                <Input isRequired onChange={(e) => {
                                    const mark = e.target.value
                                    setData((prev) => {
                                        return {
                                            ...prev, mark
                                        }
                                    })
                                }} value={data.mark} size='lg'
                                       label="mark" color='primary'/>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onPress={() => {
                                    save().then()
                                    onClose()
                                }}>
                                    save
                                </Button>
                            </ModalFooter>
                        </>}
                    </>)}
                </ModalContent>
            </Modal>
        </div>

    </div>);
};

export default AddMark;