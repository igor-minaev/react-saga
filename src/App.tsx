import {useEffect, useState} from 'react'
import './App.css'
import axios from "axios";

export type GetTodolistsResponseType = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: TodolistViewModel[]
}

export type TodolistViewModel = {
    isImportant: boolean
    id: string
    title: string
    description: string
    addedDate: string
    order: number
    images: TodolistImagesViewModel
}

export type TodolistImagesViewModel = {
    main: PhotoSizeViewModel[]
}

export type PhotoSizeViewModel = {
    url: string
    width: number
    height: number
    fileSize: number
}

function App() {
    // 1. todolists = []
    // 6. todolists = [{},{},{},{},{}] todolists from step 5
    /*const [todolists, setTodolists] = useState<TodolistViewModel[]>([])*/
    const [todolists, setTodolists] = useState<GetTodolistsResponseType | null>(null)

    /*{id: 1, title: 'css'},
    {id: 2, title: 'js'},
    {id: 3, title: 'react'},
    {id: 4, title: 'html'},
    {id: 5, title: 'java'}*/

    // 2. register effect
    useEffect(() => {
        // 4. run effect
        console.log('useEffect')
        axios.get<GetTodolistsResponseType>('https://todolists.samuraijs.com/api/1.0/todolists').then(response => {
            // 5. set data to state
            // console.log(response.data)
            setTodolists(response.data)
        })
    }, [])

    // 3. empty rendering
    // 7. todolists rendering
    console.log('rendering')
    return (
        <div>
            <ul>
                {todolists === null
                    ? 'loading'
                    : todolists.items.map(todolist => {
                    const imageUrl = todolist.images.main.length > 1 ? todolist.images.main[1].url : 'https://placehold.co/48'
                    return (
                        <li key={todolist.id.toString()}>
                            <img src={imageUrl} alt="image"/>
                            <h3>
                                {todolist.isImportant ? '🔥' : ''}
                                {todolist.title}
                            </h3>
                            <div>{todolist.description}</div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default App
