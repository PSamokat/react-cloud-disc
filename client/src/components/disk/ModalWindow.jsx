import React, {useState} from 'react';
import Input from "../../utils/input/input";
import {useDispatch, useSelector} from "react-redux";
import {setModalDisplay} from "../../store/modal/action-creators";
import {createDir} from "../../store/file/actions";
import {selectModalDisplay} from "../../store/modal/selectors";
import {selectCurrentDir} from "../../store/file/selectors";

const ModalWindow = () => {
    const [dirName, setDirName] = useState('')
    const dispatch = useDispatch()
    const visibilityDisplay = useSelector(selectModalDisplay)
    const currentDir = useSelector(selectCurrentDir)
    function modalWindowClose() {
        dispatch(setModalDisplay('none'))
    }

    function createDirHandler () {
        dispatch(createDir(currentDir, dirName))
        setDirName('')
        dispatch(setModalDisplay('none'))
    }

    return (
        <div className='modal' onClick={() => modalWindowClose()} style={{display: visibilityDisplay}}>
            <div className="modal__content" onClick={(event)=> event.stopPropagation()}>
                <div className="modal__header">
                    <div className="modal__title">Создать новую папку</div>
                    <button className='modal__close' onClick={() => modalWindowClose()}>X</button>
                </div>
                <Input type='text' placeholder='Название папки' value={dirName} setValue={setDirName}/>
                <button className="modal__create" onClick={() => createDirHandler()}>Создать</button>
            </div>
        </div>
    );
};

export default ModalWindow;