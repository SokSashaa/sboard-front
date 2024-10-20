import {FC, useState} from "react";
import css from './poll.module.scss'
import PollItem from "./PollItem/PollItem";
import {poll_dto} from "../../api/dto/poll.dto";
import delete_button from '../../img/close.svg'
import {useMutation, useQueryClient} from "react-query";
import {baseUrlPoll, deletePoll, keyGetAllPolls} from "../../api/poll";

type PollProps = {
    poll: poll_dto
}

const Poll: FC<PollProps> = ({poll}) => {
    const [vote, setVote] = useState(false)
    const queryClient = useQueryClient();

    const mutate = useMutation([baseUrlPoll, poll.id], () => {
        return deletePoll(poll.id)
    }, {
        onSuccess: data => queryClient.invalidateQueries({queryKey: keyGetAllPolls})
    })


    return <div className={css.root}>
        <div className={css.delete}><img src={delete_button} alt={'close'} onClick={() => mutate.mutate()}/></div>
        <header className={css.header}>{poll.title}</header>
        {
            poll.poll_items.map(item => <PollItem key={item.id_item}
                                                  id_poll={poll.id}
                                                  poll_item={item}
                                                  vote={vote}
                                                  setVote={setVote}/>
            )
        }
        {vote && <p className={css.count_votes}>Общее количество голосов: {poll.count_votes}</p>}

    </div>
}
export default Poll
