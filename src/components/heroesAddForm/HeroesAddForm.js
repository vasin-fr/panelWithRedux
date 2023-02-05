
import { useDispatch } from 'react-redux';
import { heroesAdding } from '../../actions';
import {v4 as uiidv4} from 'uuid';
import { useHttp } from '../../hooks/http.hook';

import {useFormik} from 'formik';

// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const dispatch = useDispatch(); 
    const {request} = useHttp();
 
    const validate = values => {
        const errors = {}
        if (values.element === 'Я владею элементом...') {
            errors.element = 'Нужно что-то выбрать';
        } else if (values.element.length === 0) {
            errors.element = 'Нужно что-то выбрать';
        }

        return errors;
    }
    
    const formik = useFormik(
        {
            initialValues: {
                name: '',
                text: '',
                element: ''
            },
            validate,
            onSubmit: values => {
                const {name, text, element} = values;

                const charChanged = { 
                    id: uiidv4(), 
                    name: name,
                    description: text,
                    element: element,
                }
                request("http://localhost:3001/heroes", "POST", JSON.stringify({...charChanged}))
                    .then(data => dispatch(heroesAdding(charChanged)))
                    .catch(err => console.log(err));
            },
        }
    )

    return (
        <form 
            onSubmit={formik.handleSubmit}
            className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input  
                    required
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    id="name" 
                    name="name" 
                    type="text" 
                    className="form-control" 
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    onChange={formik.handleChange}
                    value={formik.values.text}
                    id="text" 
                    name="text" 
                    className="form-control" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                {formik.errors.element ? <h5 style={{fontSize: '13px'}}>{formik.errors.element}</h5> : null}
                
                <select 
                        required
                        onChange={formik.handleChange}
                        value={formik.values.element}
                        className="form-select" 
                        id="element" 
                        name="element">
                    <option >Я владею элементом...</option>
                    <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option>
                </select>
            </div>

            <button 
                type="submit"
                className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;