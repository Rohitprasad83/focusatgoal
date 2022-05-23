import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

export function Links() {
  const [openLinks, setOpenLinks] = useState(false)
  const [createLink, setCreateLink] = useState(false)
  const [name, setName] = useState('')
  const [link, setLink] = useState('')
  const [links, setLinks] = useState([])

  function createLinkHandler() {
    const newLink = [...links, { id: uuidv4(), name: name, link: link }]
    setLinks(newLink)
    setCreateLink(false)
    setName('')
    setLink('')
    localStorage.setItem('links', JSON.stringify(newLink))
  }
  const deleteLink = deletedLink => {
    const filteredLink = [...links].filter(
      link => deletedLink.name !== link.name
    )
    localStorage.setItem('links', JSON.stringify(filteredLink))
    setLinks(filteredLink)
  }
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('links'))
    todos ? setLinks(todos) : setLinks([])
  }, [])

  const checkInputs = name !== '' && link !== ''

  return (
    <div className="absolute left-2 top-4 z-10 text-left mt-4">
      <p
        className="text-2xl cursor-pointer"
        onClick={() => setOpenLinks(!openLinks)}>
        Links
      </p>
      {openLinks && createLink && (
        <div className="flex flex-col gap-2 bg-slate-800 w-64 p-4 rounded-md">
          <div>
            <i
              className="fa-solid fa-arrow-left  cursor-pointer"
              onClick={() => setCreateLink(false)}></i>
          </div>
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="focus:outline-none bg-transparent border-b-2 p-0 mb-4"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="link">Link</label>
            <input
              type="text"
              id="link"
              className="focus:outline-none bg-transparent border-b-2 p-0"
              value={link}
              onChange={e => setLink(e.target.value)}
            />
          </div>
          <button
            className="w-max rounded-full bg-slate-300 text-slate-900 px-4 py-2 mt-4"
            onClick={createLinkHandler}
            disabled={!checkInputs}>
            Create
          </button>
        </div>
      )}
      {openLinks && !createLink && (
        <div className="flex flex-col gap-2 bg-slate-800 w-64 p-2 rounded-md">
          <div className="overflow-y-auto overflow-x-hidden max-h-96 flex flex-col gap-2 box-border w-full">
            {links.map(link => (
              <div
                key={link.id}
                className="flex items-center gap-2 break-all w-56 text-left">
                <a href={`${link.link}`}>{link.name}</a>

                <div className="ml-auto pr-2">
                  <i
                    className="fa-solid fa-trash cursor-pointer"
                    onClick={() => deleteLink(link)}></i>
                </div>
              </div>
            ))}
          </div>

          <div
            className="w-max cursor-pointer mt-4"
            onClick={() => setCreateLink(true)}>
            + New Link
          </div>
        </div>
      )}
    </div>
  )
}
