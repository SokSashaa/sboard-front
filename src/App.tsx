import React, {useState} from 'react';
import Button from "./components/Button/Button";
import Background from "./components/Background/Background";
import css from './app.module.scss'
import FormCreatePoll from "./components/FormCreatePoll/FormCreatePoll";
import ArrayPolls from "./components/ArrayPolls/ArrayPolls";


function App() {
    const [open, setOpen] = useState(false)
    return (
        <div className={css.App}>
            <Button size={'large'} type={'button'}
                    onClick={() => setOpen(!open)}>{!open ? 'Создать' : 'Скрыть'}</Button>
            {
                open && <Background>
                    <FormCreatePoll open={open} setOpen={setOpen}/>
                </Background>
            }
            <Background>
                <ArrayPolls/>
            </Background>
        </div>
    );
}

export default App;
