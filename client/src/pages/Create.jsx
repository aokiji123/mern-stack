import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useNavigate } from 'react-router-dom'

import style from './styles/Create/Create.module.css'

export const Create = () => {
    const history = useNavigate()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [link, setLink] = useState('')

    const pressHandler = async event => {
        if (event.key === "Enter") {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                })
                history(`/detail/${data.link._id}`)
            } catch (e) {}
        }
    }

    return (
        <div className="row">
            <div className={`col s8 offset-s2 ${style.margin}`}>
                <input placeholder="Insert link:" id="link" type="text" value={link} onKeyPress={pressHandler} onChange={e => {
                    setLink(e.target.value)
                }}/>
            </div>
        </div>
    )
}