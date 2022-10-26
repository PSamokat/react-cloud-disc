import React from 'react';
import './fileList.scss'
import File from "./file/File";
import {useSelector} from "react-redux";
import {selectFiles} from "../../../store/file/selectors";

const FileList = () => {

    const files = useSelector(selectFiles).map(file => <File file={file} key={file._id}/>)
    return (
        <div className='filelist'>
            <div className="filelist__item">
                <div className="filelist__name header">Имя</div>
                <div className="filelist__date header">Дата</div>
                <div className="filelist__size header">Размер</div>
            </div>
            {files}
        </div>
    );
};

export default FileList;