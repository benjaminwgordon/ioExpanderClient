import React, { useState, useEffect, useContext, useRef} from 'react'
import authenticationContext from '../../../authenticationContext'
import query from '../../../query'
import {  XIcon } from '@heroicons/react/outline'

const ProfileSkillsEdit = (props) => {

    const {skills, setSkills, targetUserId, toggleIsEditMode} = props
    const {token} = useContext(authenticationContext).user
    const [newSkillTechnologyName, setNewSkillTechnologyName] = useState("")
    const [NewSkillTechnologyNameRecommendation, setNewSkillTechnologyNameRecommendation] = useState("")
    const [newSkillRating, setNewSkillRating] = useState(0)
    const [message, setMessage] = useState("")
    const dropDownRef = useRef(null)

    const deleteSkill = async (deletedSkill) => {
        const res = await query.deleteRequest(`/users/${targetUserId}/skills/${deletedSkill.skill_id}`, token)
        if (res.deletedSkill){
            setSkills(skills.filter(skill => skill.skill_id !== deletedSkill.skill_id))
        }
    }

    const handleChangeNewSkillRating = (rating) => {
        setNewSkillRating(Math.max(0, Math.min(rating, 5)))
    }

    const handleNewSkillSubmit = async (e) => {
        e.preventDefault()
        const res = await query.post(`/users/${targetUserId}/skills`, {technology_name: newSkillTechnologyName, technology_rating: newSkillRating}, token)
        if (res.error){
            setMessage("You already have this skill")
            setNewSkillTechnologyName("")
            setNewSkillRating(0)
        } else{
            setMessage("")
            setSkills([...skills, res.insertedSkillDetails])
            setNewSkillTechnologyName("")
            setNewSkillRating(0)
            toggleIsEditMode()
        }
    }

    useEffect(() => {
        const fetchTechnologies = async () => {
            const res = await query.get(`/technologies?startsWith=${newSkillTechnologyName}`, token)
            if (!res.error){
                setNewSkillTechnologyNameRecommendation(res.technologies)
            }
        }
        if (newSkillTechnologyName.length > 0){
            fetchTechnologies()
        }
    }, [newSkillTechnologyName, token])

    return (
        <div>
            {
                skills &&
                skills.sort((a,b) => b.technology_rating - a.technology_rating).map(skill => {
                        return(
                            <div key={skill.technology_name + skill.technology_rating} className="px-3">
                                <div className="flex flex-row justify-between">
                                    <div>
                                        <span>{skill.technology_name}</span>
                                        <span>{" : "}</span>
                                        <span>{skill.technology_rating}</span>
                                    </div>
                                    <div className="flex flex-row">
                                        {/* Leaving in case I decide to allow updating existing skills dynamically */}
                                        
                                        {/* <button onClick={() => handleChangeNewSkillRating(newSkillRating - 1)}>
                                            <MinusIcon className="w-8 h-8 bg-red-200 rounded-md p-1" />
                                        </button>
                                        <button onClick={() => handleChangeNewSkillRating(newSkillRating + 1)}>
                                            <PlusIcon className="w-8 h-8 bg-green-200 rounded-md p-1" />
                                        </button> */}
                                        <button onClick={() => deleteSkill(skill)}>
                                            <XIcon className="w-8 h-8 bg-red-400 rounded-md p-1 text-white" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                )
            }
            <form className="px-2 py-4" >
                <p className="font-bold text-l">Add a Skill</p>
                <div className="flex flex-row w-full lg:max-w-screen-sm relative">
                    <div className="flex flex-col w-3/4">
                        <input 
                            name="newSkillTechnologyName"
                            type="text" 
                            value={newSkillTechnologyName} 
                            onChange={(e)=>{setNewSkillTechnologyName(e.target.value)}}
                            placeholder="Technology name"
                            className="border text-lg rounded-l-md p-1 border-gray-400" 
                            autoComplete="off"
                            ref={dropDownRef}
                            onClick={()=>{
                                const topPos = dropDownRef.current.getBoundingClientRect().top
                                const yOffset = window.pageYOffset
                                window.scrollTo({top: topPos + yOffset - 100, behavior:'smooth'})
                            }}
                            
                        />
                        {
                            NewSkillTechnologyNameRecommendation.length > 1 &&
                            <div className="py-1 absolute w-3/4 top-8">                  
                            {
                                NewSkillTechnologyNameRecommendation.slice(0,5).map(recommendation => {
                                    return (
                                        <div className="p-1.5 bg-gray-200 hover:bg-white focus:bg-white" onClick={()=>{setNewSkillTechnologyName(recommendation.technology_name)}}>{recommendation.technology_name}</div>
                                    )
                                })
                            }
                            </div>
                        } 
                    </div>
                <div className="flex flex-col w-1/4">
                    <select 
                        type="select" 
                        name="NewSkillRating"
                        value={newSkillRating} 
                        min="0"
                        max="5"
                        onChange={(e) => {handleChangeNewSkillRating(e.target.value)}} 
                        className="appearance-none p-1 text-lg text-center border-t border-r border-b border-gray-400 rounded-r-md"
                    >
                        <option value={1} className="p-1 text-center border-t border-r border-b border-gray-400 rounded-r-md">1</option>
                        <option value={2} className="p-1 text-center border-t border-r border-b border-gray-400 rounded-r-md">2</option>
                        <option value={3} className="p-1 text-center border-t border-r border-b border-gray-400 rounded-r-md">3</option>
                        <option value={4} className="p-1 text-center border-t border-r border-b border-gray-400 rounded-r-md">4</option>
                        <option value={5} className="p-1 text-center border-t border-r border-b border-gray-400 rounded-r-md">5</option>

                    </select>
                </div>
            </div>
            <button 
                onClick={(e) => handleNewSkillSubmit(e)}
                className="rounded-md bg-green-500 text-white p-1 shadow-md focus:ring-white-2"
            >
                Submit
            </button>
        </form>
            
            {message && 
                <p>{message}</p>
            }
        </div>
    )
}

export default ProfileSkillsEdit
