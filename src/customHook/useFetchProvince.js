import { useEffect, useState } from "react";
import { userServices } from "../services";
import buildOptions from "../utils/buildOptions";
import { TYPE } from "../utils/constant";

function useFetchProvince() {
    const [provinces, setProvinces] = useState([]);
    const [provinceOptions, setProvinceOptions] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await userServices.getListProvince();
                if (response.code === 200) {
                    let customData = response.data.map((item, index) => {
                        return {
                            provinceID: item.ProvinceID,
                            provinceName: item.ProvinceName,
                        }
                    })
                    const options = buildOptions(customData, TYPE.PROVINCE);
                    setProvinces(customData);
                    setProvinceOptions(options);
                } else {
                    setProvinces([]);
                    setProvinceOptions([]);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);
    return { provinces, provinceOptions };
}

export default useFetchProvince;