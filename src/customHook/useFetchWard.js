import { useEffect, useState } from "react";
import { userServices } from "../services";
import buildOptions from "../utils/buildOptions";
import { TYPE } from "../utils/constant";

function useFetchWard(districtId) {
    const [wards, setWards] = useState([]);
    const [wardOptions, setWardOptions] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await userServices.getListWard(districtId);
                if (response.code === 200) {
                    let customData = response.data.map((item, index) => {
                        return {
                            wardName: item?.WardName,
                            wardID: item?.WardCode,
                        }
                    })
                    const options = buildOptions(customData, TYPE.WARD);
                    setWards(customData);
                    setWardOptions(options);
                } else {
                    setWards([]);
                    setWardOptions([]);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [districtId])
    return { wards, wardOptions };
}

export default useFetchWard;