import Contract from "../contracts/spu.json"


const getInit = async () => {
    const web3 = window.web3
    let networkId = null;
    if (web3.eth) {
        networkId = await web3.eth.net.getId()
    }
    const networkData = networkId ? Contract.networks[networkId] : null;
    return {
        web3, networkData
    }
}

export const solveContractMethod = async ({method}) => {
    const {web3, networkData} = await getInit();
    let r = null;
    if (networkData) {
        const abi = Contract.abi
        const address = networkData.address
        const contract = new web3.eth.Contract(abi, address)
        try {
            r = await eval(`contract.methods.${method}.call()`)
        } catch (e) {
            console.log(e)
        }
    }
    return Promise.resolve(r)
}

export const solveContractArray = async ({arrayName, counterName, viewMethodName = null}) => {
    const {web3, networkData} = await getInit();
    let r = null;
    if (networkData) {
        const abi = Contract.abi
        const address = networkData.address
        const contract = new web3.eth.Contract(abi, address)
        try {
            let counter = await solveContractMethod({method: `${counterName}()`})
            let myArray = [];
            for (let i = 0; i < counter; i++) {
                let v = await solveContractMethod({method: `${arrayName}('${i}')`})
                if (viewMethodName) {
                    let s = await solveContractMethod({method: `${viewMethodName}('${v}')`})
                    myArray.push(s);
                } else {
                    myArray.push(v)
                }
            }
            r = myArray;
        } catch (e) {
            console.log(e)
        }
    }
    return Promise.resolve(r)
}

export const changeContractState = async ({method}) => {

    const web3 = window.web3
    const networkId = await web3.eth.net.getId()
    const accounts = await web3.eth.getAccounts()
    const networkData = Contract.networks[networkId];


    let r = null;
    if (networkData) {
        const abi = Contract.abi
        const address = networkData.address
        const contract = new web3.eth.Contract(abi, address)
        r = await eval(`contract.methods.${method}.send({from: accounts[0]})`)

    }
    return Promise.resolve(r)
}


export const SCApi = {
    "checkRole": async ({address}) => await solveContractMethod({method: `checkRole('${address}')`}),
    "checkEmp": async ({address}) => await solveContractMethod({method: `ChekIfEmp('${address}')`}),
    "checkStudent": async ({address}) => await solveContractMethod({method: `ChekIfstudentaddress('${address}')`}),
    "addStudent": async ({
                             id,
                             firstName,
                             lastName,
                             fatherName,
                             motherName,
                             gender,
                             email,
                             collegeName,
                             dateOfBirth,
                             mobileNumber
                         }) => await changeContractState({method: `register_student('${parseInt(id)}','${firstName}','${lastName}','${fatherName}','${motherName}','${gender}','${email}','${collegeName}','${dateOfBirth}','${mobileNumber}')`}),
    "getAllStudents": async () => await solveContractArray({
        arrayName: "all_students_id", counterName: "s_counter", viewMethodName: "get_student"
    }),
    "viewDetailsStudent": async ({id}) => await solveContractMethod({method: `get_student('${id}')`}), // "viewDetailsStudent": async ({id}) => await solveContractMethod({method: `view_student('${id}')`}),
    "editStudent": async ({
                              id,
                              firstName,
                              lastName,
                              fatherName,
                              motherName,
                              gender,
                              email,
                              collegeName,
                              dateOfBirth,
                              mobileNumber
                          }) => await changeContractState({method: `modifyStudent('${parseInt(id)}','${firstName}','${lastName}','${fatherName}','${motherName}','${gender}','${email}','${collegeName}','${dateOfBirth}','${mobileNumber}')`}),
    "deleteStudent": async ({id}) => await changeContractState({method: `deleteStudent('${parseInt(id)}')`}),
    "addProfessor": async ({
                               id,
                               firstName,
                               lastName,
                               fatherName,
                               motherName,
                               gender,
                               email,
                               collegeName,
                               dateOfBirth,
                               mobileNumber,
                               specialization
                           }) => await changeContractState({method: `register_prof('${parseInt(id)}','${firstName}','${lastName}','${fatherName}','${motherName}','${gender}','${email}','${collegeName}','${dateOfBirth}','${mobileNumber}','${specialization}')`}),
    "addEmployee": async ({address}) => await changeContractState({method: `register_emp('${address}')`}),
    "addAuth": async ({address}) => await changeContractState({method: `add_authorized_ad('${address}')`}),
    "deleteEmployee": async ({id}) => await changeContractState({method: `Delet_emp('${parseInt(id)}')`}),
    "deleteProfessor": async ({id}) => await changeContractState({method: `deleteprof('${parseInt(id)}')`}),
    "getAllEmployee": async () => await solveContractArray({
        arrayName: " all_employees", counterName: "e_counter"
    }),
    "getAllAuth": async () => await solveContractArray({
        arrayName: " authorized", counterName: "a_counter"
    }),
    "addSubject": async ({
                             id, name, weekly_hour, level, college
                         }) => await changeContractState({method: `Add_corse('${parseInt(id)}','${name}','${weekly_hour}','${level}','${college}')`}),
    "getAllProfessors": async () => await solveContractArray({
        arrayName: "all_profs_id", counterName: "p_counter", viewMethodName: "get_prof"
    }),
    "getAllSubjects": async () => await solveContractArray({
        counterName: "c_counter", arrayName: "spu_courses",
    }),
    "getSubject": async ({id}) => await solveContractMethod({method:`get_course('${id}')`}),
    "getProfessor": async ({id}) => solveContractMethod({method: `get_prof('${id}')`}),
    "addAddressToStudent": async ({
                                      id, address
                                  }) => changeContractState({method: `add_address_to_student('${parseInt(id)}','${address}')`}),
    "addAddressToProfessor": async ({
                                        id, address
                                    }) => changeContractState({method: `add_address_to_prof('${parseInt(id)}','${address}')`}),
    "addWarningToStudent": async ({
                                      id, warning
                                  }) => changeContractState({method: `add_warnning('${parseInt(id)}','${warning}')`}),
    "editProfessor": async ({
                                id,
                                firstName,
                                lastName,
                                fatherName,
                                motherName,
                                gender,
                                email,
                                collegeName,
                                dateOfBirth,
                                mobileNumber,
                                specialization

                            }) => await changeContractState({method: `modifyprof('${parseInt(id)}','${firstName}','${lastName}','${fatherName}','${motherName}','${gender}','${email}','${collegeName}','${dateOfBirth}','${mobileNumber}','${specialization}')`}),
    "addMark": async ({
                          course_id, w_h, student_id, mark
                      }) => changeContractState({method: `add_course_marks('${parseInt(course_id)}','${w_h}','${student_id}','${mark}')`}),
    "getWarnings":async ({id})=>await solveContractMethod({method:`get_warnnings('${id}')`}),
    "getStudentCourses":async ({id})=>await solveContractMethod({method:`get_student_courses('${id}')`}),
    "getMarks":async ({id})=>await solveContractMethod({method:`get_Course_marks('${id}')`})


}