import React from 'react';
import './file.scss'
import folderLogo from  '../../../../assets/img/folder.svg'
import fileLogo from  '../../../../assets/img/file.svg'
import {useDispatch} from "react-redux";
import {setCurrentDir, setParentDir} from "../../../../store/file/action-creators";
import {deleteFile, downloadFile} from "../../../../store/file/actions";

const File = ({file}) => {

    const dispatch = useDispatch()
    function openDirHandler() {
        if (file.type === 'dir') {
            dispatch(setCurrentDir(file._id));
            dispatch(setParentDir(file.parent));
        }
    }

    function downloadClickHandler (e) {
        e.stopPropagation()
        downloadFile(file)
    }
    function deleteClickHandler (e) {
        e.stopPropagation()
        dispatch(deleteFile(file))
    }
    return (
        <div className='file' onClick={openDirHandler}>
            <div className="file__item">
                <img src={file.type === 'dir'? folderLogo : fileLogo } alt="" className="file__img"/>
                <div className="file__name">{file.name}</div>
                {file.type === 'dir' || <div className="file__button file__download" onClick={downloadClickHandler}>Скачать</div>}
                <div className="file__button file__delete" onClick={deleteClickHandler}>Удалить</div>
                <div className="file__date">{file.date.slice(0,10)}</div>
                <div className="file__size">{file.size}</div>
            </div>

        </div>
    );
};

export default File;