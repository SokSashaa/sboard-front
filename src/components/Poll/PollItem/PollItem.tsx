import {FC} from "react";
import css from './poll_item.module.scss'
import {poll_item_dto} from "../../../api/dto/poll_item.dto";
import {useMutation, useQueryClient} from "react-query";
import {addVote, baseUrlPoll, keyGetAllPolls} from "../../../api/poll";

type PollItemProps = {
    id_poll: string,
    poll_item: poll_item_dto,
    vote: boolean,
    setVote: (vote: boolean) => void
}
const PollItem: FC<PollItemProps> = ({id_poll, poll_item, vote, setVote}) => {
    const queryClient = useQueryClient()

    const mutate = useMutation([baseUrlPoll, poll_item.id_item], () => {
        return addVote(id_poll, poll_item.id_item)
    }, {onSuccess: data => queryClient.invalidateQueries(keyGetAllPolls)})

    const onCLick = () => {
        if (!vote) {
            setVote(true);
            mutate.mutate()
        }
    }

    return <div className={css.root} onClick={onCLick}>
        <div className={css.main}>
            {!vote && <input type={"radio"} onClick={onCLick}/>}
            <p>{poll_item.option}</p>
        </div>
        {vote && <p>{poll_item.count_voice}</p>}
    </div>
}
export default PollItem
