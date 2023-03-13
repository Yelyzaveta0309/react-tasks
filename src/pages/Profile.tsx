import React , {FC, useContext, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ThemeContext } from '../utils/ThemeContext';
import { changeName, toggleProfile } from '../store/profile/actions';
import { ProfileState } from '../store/profile/reducer';
import { selectName, selectVisible } from '../store/profile/selectors';

export const Profile: FC = () =>{

    const {theme, toggleTheme} = useContext(ThemeContext)
    const dispatch = useDispatch();

    const visible = useSelector(selectVisible);
    const name = useSelector(selectName);
    const [value, setValue] = useState('');
    
    return(
        <>
            <h2>Profile</h2>
            <div>
                <p>{theme === 'light' ? 'солнце' : 'луна'}</p>
                <button onClick={toggleTheme}>changeTheme</button>
            </div>
            <hr/>
            <div>
                <input type='text' onChange={(e)=> setValue(e.target.value)} value={value}/>
                <button onClick={()=>dispatch(changeName(value))}>change name</button>
            </div>
        </>
    );
};

    