import React, { useState, useEffect, useContext} from 'react'
import authenticationContext from '../../../authenticationContext'
import query from '../../../query'

const ProfileSkillsEdit = (props) => {

    const {skills, setSkills, targetUserId} = props
    const token = useContext(authenticationContext).user.token
    const user_id = useContext(authenticationContext).user.user_id
    const [newSkillTechnologyName, setNewSkillTechnologyName] = useState("")
    const [NewSkillTechnologyNameRecommendation, setNewSkillTechnologyNameRecommendation] = useState("")
    const [newSkillRating, setNewSkillRating] = useState(0)
    const [message, setMessage] = useState("")

    const deleteSkill = async (deletedSkill) => {
        const res = await query.deleteRequest(`/users/${targetUserId}/skills/${deletedSkill.skill_id}`, token)
        if (res.deletedSkill){
            setSkills(skills.filter(skill => skill.skill_id !== deletedSkill.skill_id))
        }
    }

    const handleChangeNewSkillRating = (rating) => {
        setNewSkillRating(Math.max(0, Math.min(rating, 5)))
    }

    const handleNewSkillSubmit = async () => {
        const res = await query.post(`/users/${user_id}/skills`, {technology_name: newSkillTechnologyName, technology_rating: newSkillRating}, token)
        if (res.error){
            setMessage("You already have this skill")
            return
        }
        setMessage("")
        setSkills([...skills, res.insertedSkillDetails])
        setNewSkillTechnologyName("")
        setNewSkillRating(0)
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
                            <div key={skill.technology_name + skill.technology_rating}>
                                <span>{skill.technology_name}</span>
                                <span> : {skill.technology_rating}</span>
                                <button onClick={() => deleteSkill(skill)}>Delete</button>
                            </div>
                        )
                    }
                )
            }
            <input type="text" value={newSkillTechnologyName} onChange={(e)=>{setNewSkillTechnologyName(e.target.value)}} />
            <input type="number" value={newSkillRating} onChange={(e) => {handleChangeNewSkillRating(e.target.value)}} />
            <button onClick={handleNewSkillSubmit}>Submit</button>
            <br/>
            {
                NewSkillTechnologyNameRecommendation &&
                <select value={newSkillTechnologyName} onChange={(e) => setNewSkillTechnologyName(e.target.value)}>
                    <option value={newSkillTechnologyName}>{newSkillTechnologyName}</option>
                    {
                        NewSkillTechnologyNameRecommendation.map(recommendation => {
                            return (
                                <option value={recommendation.technology_name}>{recommendation.technology_name}</option>
                            )
                        })
                    }
                </select>
            } 
            {message && 
                <p>{message}</p>
            }
        </div>
    )
}

export default ProfileSkillsEdit
