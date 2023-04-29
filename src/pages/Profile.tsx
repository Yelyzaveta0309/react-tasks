import React , {FC, useContext, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ThemeContext } from '../utils/ThemeContext';
import { changeName, toggleProfile } from '../store/profile/slice';
import { selectName, selectVisible } from '../store/profile/selectors';
import { onValue, update } from 'firebase/database';
import { userRef } from '../services/firebase';

export const Profile: FC = () =>{

    const {theme, toggleTheme} = useContext(ThemeContext)
    const dispatch = useDispatch();

    const visible = useSelector(selectVisible);
    const name = useSelector(selectName);
    const [value, setValue] = useState('');
    
    useEffect(()=>{
        onValue(userRef, (snapshot)=>{
            const user = snapshot.val();
            dispatch(changeName(user.name || ''));
        });
    }, [])

    const handleChangeName = async () => {
        update(userRef, {
            name: value,
        })
    }

    return(
        <>
            <h2>Profile</h2>
            <div>
                <p>{theme === 'light' ? 'солнце' : 'луна'}</p>
                <button onClick={toggleTheme}>changeTheme</button>
            </div>
            <hr/>
            <div>
                <p>{name}</p>
                <input type="checkbox" checked={visible} readOnly/>
                <button onClick={()=>dispatch(toggleProfile())}>
                    change visible
                </button>
                <br/>
    
                <input type='text' onChange={(e)=> setValue(e.target.value)} value={value}/>
                <button onClick={handleChangeName}>change name</button>
            </div>
        </>
    );
};

    