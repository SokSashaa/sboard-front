export type poll_item_dto = {
    id_item: string
    option: string
    count_voice: number
    poll: string
}

export type poll_item_create_dto = Omit<poll_item_dto,'id_item'| 'count_voice' | 'poll'>
