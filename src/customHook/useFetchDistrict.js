import { useEffect, useState } from "react";
import { userServices } from "../services";
import buildOptions from "../utils/buildOptions";
import { TYPE } from "../utils/constant";

function useFetchDistrict(provinceId) {
    const [districts, setDistricts] = useState([]);
    const [districtOptions, setDistrictOptions] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await userServices.getListDistrict(provinceId);
                if (response.code === 200) {
                    let customData = response.data.map((item, index) => {
                        return {
                            districtID: item.DistrictID,
                            districtName: item.DistrictName,
                        }
                    })
                    const options = buildOptions(customData, TYPE.DISTRICT);
                    setDistricts(customData);
                    setDistrictOptions(options);
                } else {
                    setDistricts([]);
                    setDistrictOptions([]);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [provinceId]);
    return { districts, districtOptions };
}

export default useFetchDistrict;