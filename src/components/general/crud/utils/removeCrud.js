import axios from "axios";
import { baseApiUrl, showError } from "../../../../global";

async function removeCrud(selected, url) {
    url = `/${url}`;

    const removeId = selected.id ? selected.id : selected

    const config = {
        method: "delete",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        url: `${baseApiUrl}${url}/${removeId}`,
    };
    console.log('config', config);
    
    return await axios(config)
        .catch(showError);
}

export { removeCrud }