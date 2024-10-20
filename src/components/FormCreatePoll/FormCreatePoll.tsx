import React, {FC, useState} from "react";
import {initial_create_poll, poll_create} from "../../api/dto/poll.dto";
import Button from "../Button/Button";
import delete_button from '../../img/close.svg'
import css from './form_create_poll.module.scss'
import {useMutation, useQueryClient} from "react-query";
import {createPoll, keyCreatePoll, keyGetAllPolls} from "../../api/poll";

type FormCreatePollProps = {
    open: boolean,
    setOpen: (value: boolean) => void
}

const FormCreatePoll: FC<FormCreatePollProps> = ({open, setOpen}) => {

    const [pollData, setPollData] = useState<poll_create>(initial_create_poll);
    const queryClient = useQueryClient()

    const mutate = useMutation(keyCreatePoll, (data: poll_create) => {
        if (data.poll_items.length > 0) return createPoll(data)
        else {
            alert('Вы не добавили варианты к голосованию')
            return new Promise(resolve => resolve)
        }
    }, {
        onSuccess: data => {
            queryClient.invalidateQueries(keyGetAllPolls);
            setOpen(!open);
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setPollData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleItemChange = (index: number, value: string) => {
        const updatedItems = [...pollData.poll_items];
        updatedItems[index].option = value;
        setPollData(prevState => ({
            ...prevState,
            poll_items: updatedItems,
        }));
    };

    const addPollItem = () => {
        setPollData(prevState => ({
            ...prevState,
            poll_items: [...prevState.poll_items, {option: ''}],
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        mutate.mutate(pollData)
        e.preventDefault();
    };

    const deletePollItem = (index: number) => {
        setPollData(prev => ({...prev, poll_items: prev.poll_items.filter((value, ind) => ind != index)}))
    }

    return (
        <form onSubmit={handleSubmit} className={css.root}>
            <div>
                <label>
                    Заголовок:
                    <input
                        type="text"
                        name="title"
                        value={pollData.title}
                        onChange={handleChange}
                        placeholder={'Заголовок'}
                        required
                    />
                </label>
            </div>
            <div>
                <h3>Варианты:</h3>
                {pollData.poll_items.map((item, index) => (
                    <div key={index} className={css.option}>
                        <label>
                            {index + 1}:
                            <input
                                type="text"
                                value={item.option}
                                placeholder={'Значение варианта'}
                                required
                                onChange={(e) => handleItemChange(index, e.target.value)}
                            />
                        </label>
                        <img src={delete_button} alt={'Удалить вариант'} onClick={() => deletePollItem(index)}/>
                    </div>
                ))}
            </div>
            <Button type="button" onClick={addPollItem} className={css.buttons}>Добавить вариант</Button>
            <Button type="submit" className={css.buttons}>Создать голосование</Button>
        </form>
    )
};
export default FormCreatePoll
