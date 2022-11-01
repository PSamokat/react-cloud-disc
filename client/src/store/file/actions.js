import axios from "axios";
import {setFiles, addFile, deleteFileAction, setParentDir} from "./action-creators"

export function getFiles (dirId) {
    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:5000/api/files${dirId ? '?parent='+ dirId : ''}`,
                {
              headers: {authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(setFiles(response.data.files))
            dispatch(setParentDir(response.data.parent))
        } catch (e) {
            alert(e?.response?.data?.message)
        }
    }
}

export function createDir (dirId, name) {
    return async dispatch => {
        try {
            const response = await axios.post(`http://localhost:5000/api/files`,
                {
                    name,
                    parent: dirId,
                    type: 'dir'
                },{
                    headers: {authorization: `Bearer ${localStorage.getItem('token')}`}
                })
            dispatch(addFile(response.data))
        } catch (e) {
            alert(e?.response?.data?.message)
        }
    }
}

export function uploadFile (file, dirId) {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file, encodeURIComponent(file.name) );
            if (dirId) {
                formData.append('parent', dirId)
            }
            const response = await axios.post(`http://localhost:5000/api/files/upload`, formData,
                {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                })
            response.data.name = decodeURIComponent(response.data.name)
            dispatch(addFile(response.data))
        } catch (e) {
            alert(e?.response?.data?.message)
        }
    }
}

export async function downloadFile (file) {
    /*await axios.get(`http://localhost:5000/api/files/download?id=${file._id}`,
        {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                responseType: 'blob'
            }
        })
        .then(response => {
            const link = document.createElement('a')
            const href = URL.createObjectURL(new Blob([response.data]))
            link.href = href
            link.setAttribute('download', `${file.name}`)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(href)
        })
*/
    const response = await fetch(`http://localhost:5000/api/files/download?id=${file._id}`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
        }}
    )
    if(response.status === 200) {
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = file.name
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }
}

export function deleteFile (file) {
    return async dispatch => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/files?id=${file._id}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`

                }
            })
            dispatch(deleteFileAction(file._id))
            alert(response.data.message)
        } catch (e) {
            alert(e?.response?.data?.message)
        }
    }
}