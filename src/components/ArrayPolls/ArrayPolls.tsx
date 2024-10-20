import React, {FC} from "react";
import {useQuery} from "react-query";
import {getAllPolls, keyGetAllPolls} from "../../api/poll";
import Poll from "../Poll/Poll";

const ArrayPolls: FC = () => {
    const {data} = useQuery(keyGetAllPolls, () => {
            return getAllPolls()
        }, {
            refetchInterval: 5000
        }
    )

    return <>
        {
            data && data?.length > 0 ? data.map((item) => <Poll key={item.id} poll={item}/>) :
                <p style={{color: 'white'}}>Голосований нет :(</p>
        }
    </>
}

export default ArrayPolls
