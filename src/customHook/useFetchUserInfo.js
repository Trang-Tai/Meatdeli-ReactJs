import { useEffect, useState } from "react";
import { userServices } from "../services";

function useFetchUserInfo({ paranoid = '', email = '', id = '', ...props}) {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                let res = await userServices.getUser({ paranoid, email });
                if(res && res.errCode === 0) {
                    let result = res.users.map((item, index) => {
                        let fullname = item.firstName + ' ' + item.lastName;
                        return {
                            ...item,
                            fullname: fullname,
                        }
                    })
                    setData(result);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [paranoid, email, id, props?.reload])
    return data;
}

export default useFetchUserInfo;