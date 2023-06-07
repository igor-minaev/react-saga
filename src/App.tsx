import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios";

function App() {
    // 1. tags = []
    // 6. tags = [{},{},{},{},{}] tags from step 5
    const [tags, setTags] = useState<any[]>([])

    /*{id: 1, title: 'css'},
    {id: 2, title: 'js'},
    {id: 3, title: 'react'},
    {id: 4, title: 'html'},
    {id: 5, title: 'java'}*/

    // 2. register effect
    useEffect(() => {
        // 4. run effect
        console.log('useEffect')
        axios.get('https://todolists.samuraijs.com/api/1.0/todolists').then(response => {
            // 5. set data to state
            console.log(response.data)
            setTags(response.data.items)
        })
    }, [])

    // 3. empty rendering
    // 7. tags rendering
    console.log('rendering')
    return (
        <div>
            <ul>
                {tags.map((t: any) => {
                    const imageUrl = t.images.main.length > 1 ? t.images.main[1].url : 'https://placehold.co/48'
                    return (
                        <li key={t.id.toString()}>
                            <img src={imageUrl} alt="image"/>
                            <h3>
                                {t.isImportant ? '🔥' : ''}
                                {t.title}
                            </h3>
                            <div>{t.description}</div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default App
