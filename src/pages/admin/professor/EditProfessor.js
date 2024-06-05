import React from 'react';

import UserInputModal from "../../../components/UserInputModal";

const EditProfessor = ({user,onEdit}) => <UserInputModal init={user} onEdit={onEdit} asProfessor/>;


export default EditProfessor;