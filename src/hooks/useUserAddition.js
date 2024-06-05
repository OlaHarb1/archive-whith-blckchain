import {useState} from "react";
import {SCApi} from "../tools/smartContractApi";
import {toast} from "react-toastify";

const UseUserAddition = (props = {onEdit: null, onAdd: null, isProfessor: false, init: null}) => {

    const {isProfessor} = props;
    const initState = {
        id: "",
        firstName: "",
        lastName: "",
        fatherName: "",
        motherName: "",
        gender: "female",
        email: "",
        collegeName: "",
        dateOfBirth: "",
        mobileNumber: ""
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;


    const getInitState = () => {
        if (!isProfessor) return initState;
        return {
            ...initState, specialization: ""
        }
    }
    const [data, setData] = useState(props?.init ?? getInitState())

    const onChangeInput = (e) => {
        setData((prev) => {
            return {
                ...prev, [e.target.name]: e.target.value ?? e
            }
        })
    }

    const _create = async () => {
        let isExist = false


        if (!isProfessor) {

            const r = await SCApi.getAllStudents()
            if (r) {
                r.forEach((student) => {

                    if (parseInt(student.id) === parseInt(data.id)) {
                        isExist = true


                    }
                })
            }

            if (isExist) {
                toast("id ist already exist")
                return;

            }
            if (!isExist) {
                SCApi.addStudent({
                    id: data.id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    fatherName: data.fatherName,
                    motherName: data.motherName,
                    gender: data.gender,
                    email: data.email,
                    collegeName: data.collegeName,
                    dateOfBirth: data.dateOfBirth,
                    mobileNumber: data.mobileNumber
                }).then((r) => {
                    if (props.onAdd) {
                        if (r) {
                            props.onAdd()
                        }
                    }
                }).catch((err) => {
                    toast("data ist required")
                })


            }
            return;
        }

        const r = await SCApi.getAllProfessors()
        if (r) {
            r.forEach((professor) => {

                if (parseInt(professor.id) === parseInt(data.id)) {
                    isExist = true


                }
            })
        }

        if (isExist) {
            toast("id ist already exist")
            return;

        }
        if (!isExist) {
            SCApi.addProfessor({
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                fatherName: data.fatherName,
                motherName: data.motherName,
                gender: data.gender,
                email: data.email,
                collegeName: data.collegeName,
                dateOfBirth: data.dateOfBirth,
                mobileNumber: data.mobileNumber,
                specialization: data.specialization
            }).then((r) => {
                if (props.onAdd) {
                    if (r) {
                        props.onAdd()
                    }
                }
            }).catch((err) => {
                toast("data ist required")
            });


        }


    }

    const _edit =  () => {
        if (!isProfessor) {
            SCApi.editStudent({
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                fatherName: data.fatherName,
                motherName: data.motherName,
                gender: data.gender,
                email: data.email,
                collegeName: data.collegeName,
                dateOfBirth: data.dateOfBirth,
                mobileNumber: data.mobileNumber
            }).then((r)=>{
                if (props.onEdit) {
                    if (r) {
                        props.onEdit()
                    }
                }
            }).catch(()=>{
                toast("you are canceled the operation")
            })
            return;

        }
         SCApi.editProfessor({
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            fatherName: data.fatherName,
            motherName: data.motherName,
            gender: data.gender,
            email: data.email,
            collegeName: data.collegeName,
            dateOfBirth: data.dateOfBirth,
            mobileNumber: data.mobileNumber,
            specialization: data.specialization
        }).then((r)=>{
             if (props.onEdit) {
                 if (r) {
                     props.onEdit()
                 }
             }
         }).catch(()=>{
             toast("you are canceled the operation")

         })



    }

    const save = () => {

        if (props?.init) {
            _edit();

        } else {
            let validate = true
            Object.entries(data).map(([k, v]) => {
                if (v === '') {
                    validate = false
                    toast(`${k} is required`)
                }
            })
            if (validate) {
                const isEmail = emailRegex.test(data.email);
                console.log(isEmail)
                if (!isEmail) {
                    toast("email invalid ")
                    return;
                }
                _create();
            }
        }


    }

    return {
        save, onChangeInput, data, setData
    };
};

export default UseUserAddition;