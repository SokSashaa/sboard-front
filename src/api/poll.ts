import {poll_create, poll_dto} from "./dto/poll.dto";
import axios from "../utils/axios";

export const baseUrlPoll = '/polls'
export const keyCreatePoll = '/polls';
export const createPoll = async (data: poll_create) => {
    return (await axios.post(baseUrlPoll, data)).data
}

export const deletePoll = async (id_poll: string) => {
    return (await axios.delete(`${baseUrlPoll}/${id_poll}`, {data: id_poll})).data
}

export const keyGetAllPolls = '/polls';
export const getAllPolls = async (): Promise<poll_dto[]> => {
    return (await axios.get(baseUrlPoll)).data
}

export const keyAddVote = '/polls';
export const addVote = async (id_poll: string, item_poll: string) => {
    return (await axios.post(`${baseUrlPoll}/${id_poll}/vote`, {id_item: item_poll})).data
}
