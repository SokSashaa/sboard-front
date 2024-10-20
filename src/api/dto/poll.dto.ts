import {poll_item_create_dto, poll_item_dto} from "./poll_item.dto";

export type poll_dto = {
    id: string,
    title: string,
    poll_items: poll_item_dto[],
    count_votes: number
}

export type poll_create = Omit<poll_dto, 'id' | 'poll_items' | 'count_votes'> & { poll_items: poll_item_create_dto[] }

export const initial_create_poll: poll_create = {
    title: '',
    poll_items: []
}

