import axios from "axios";

export const downloadFile = {
    downloadFile: (url: string) => axios({
        url: url,
        method: 'GET',
        responseType: 'blob'
    })
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'image.jpg');
            document.body.appendChild(link);
            link.click();
        })
}