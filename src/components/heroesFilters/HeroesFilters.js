import { useDispatch, useSelector } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import { filteringHeroes, filterHeroes } from '../../actions';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const dispatch = useDispatch();
    const {request} = useHttp();
    let heroes = [];
    
    const onFilterHeroes = (e) => {
        request('http://localhost:3001/heroes')
            .then(data => heroes = data)
            .catch(data => console.log(data))
        console.log(heroes)
        if (e.target.value === 'all') {
            dispatch(filteringHeroes(heroes))
            return heroes;
        } else {
            dispatch(filterHeroes(heroes.filter(heroe => heroe.element === e.target.value)))
        }
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    <button 
                        onClick={onFilterHeroes} 
                        value={'all'} 
                        className="btn btn-outline-dark active">Все</button>
                    <button 
                        onClick={onFilterHeroes} 
                        value={'fire'}
                        className="btn btn-danger">Огонь</button>
                    <button 
                        onClick={onFilterHeroes} 
                        value={'water'}
                        className="btn btn-primary">Вода</button>
                    <button 
                        onClick={onFilterHeroes} 
                        value={'wind'}
                        className="btn btn-success">Ветер</button>
                    <button 
                        onClick={onFilterHeroes} 
                        value={'earth'}
                        className="btn btn-secondary">Земля</button>
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;