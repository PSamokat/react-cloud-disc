import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFiles, uploadFile} from "../../store/file/actions";
import FileList from "./fileList/FileList";
import'./disk.scss'
import ModalWindow from "./ModalWindow";
import {setModalDisplay} from "../../store/modal/action-creators";
import {setCurrentDir} from "../../store/file/action-creators";
import {selectCurrentDir, selectParentDir} from "../../store/file/selectors";

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(selectCurrentDir)
    const parentDir = useSelector(selectParentDir);
    const [dragEnter, setDragEnter] = useState(false)
    useEffect(() => {
        dispatch(getFiles(currentDir))
    }, [currentDir] )

    function showModalHandler() {
        dispatch(setModalDisplay('flex'))
    }
    const backClickHandler = useCallback(() => {
        dispatch(setCurrentDir(parentDir))
    }, [parentDir])
    function fileUploadHandler(event) {
        const files = [...event.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }
    function dragEnterHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }
    function dragLeaveHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
    }
    function dragOverHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }
    function dropHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        const files = [...event.dataTransfer.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setDragEnter(false)
    }

    return (
        <div className='disk' onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragOverHandler}>
            <div className="disk__buttons">
                <button className="disk__buttons-back" onClick={backClickHandler}>Назад</button>
                <button className="disk__buttons-create" onClick={showModalHandler}>Создать папку</button>
                <div className="disk__upload">
                    <label htmlFor="disk__upload-input" className="disk__upload-label">Загрузить файл</label>
                    <input
                        type="file"
                        id="disk__upload-input"
                        className="disk__upload-input"
                        onChange={(event) => fileUploadHandler(event)}
                        multiple={true}
                    />
                </div>
            </div>
            {dragEnter &&
                <div className="disk__drop"
                     onDrop={dropHandler}
                     onDragEnter={dragEnterHandler}
                     onDragLeave={dragLeaveHandler}
                     onDragOver={dragOverHandler}>
                    <div className="disk__drop-area">
                        Перетяните файлы сюда
                    </div>
                </div>}
            <FileList/>
            <ModalWindow/>
        </div>

    );
};

export default Disk;