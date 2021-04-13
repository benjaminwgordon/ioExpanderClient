import React, { useState, useEffect, useContext} from 'react'
import authenticationContext from '../../../authenticationContext'
import query from '../../../query'

const ProfileSkillsEdit = (props) => {

    const {skills, setSkills, targetUserId} = props
    const token = useContext(authenticationContext).user.token
    const user_id = useContext(authenticationContext).user.user_id
    const [newSkillTechnologyName, setNewSkillTechnologyName] = useState("")
    const [NewSkillTechnologyNameRecommendation, setNewSkillTechnologyNameRecommendation] = useState(null)
    const [newSkillRating, setNewSkillRating] = useState(0)

    const deleteSkill = async (deletedSkill) => {
        const res = await query.deleteRequest(`/users/${targetUserId}/skills/${deletedSkill.skill_id}`, token)
        if (res.deletedSkill){
            setSkills(skills.filter(skill => skill.skill_id !== deletedSkill.skill_id))
        }
    }

    const handleChangeNewSkillRating = (rating) => {
        setNewSkillRating(Math.max(0, Math.min(rating, 5)))
    }

    const selectNameRecommendation = (name) => {
        setNewSkillTechnologyName(name)
    }

    const handleNewSkillSubmit = async () => {
        const res = await query.post(`/users/${user_id}/skills`, {technology_id: newSkillTechnologyName, technology_rating: newSkillRating}, token)
        console.log(res)
    }

    useEffect(() => {
        const fetchTechnologies = async () => {
            const res = await query.get(`/technologies?startsWith=${newSkillTechnologyName}`, token)
            setNewSkillTechnologyNameRecommendation(res.technologies)
        }
        if (newSkillTechnologyName.length > 0){
            fetchTechnologies()
        }
    }, [newSkillTechnologyName, token])

    return (
        <div>
            {
                skills &&
                skills.map(skill => {
                        return(
                            <div>
                                <span>{skill.technology_name}</span>
                                <span> : {skill.rating}</span>
                                <button onClick={() => deleteSkill(skill)}>Delete</button>
                            </div>
                        )
                    }
                )
            }
            <input type="text" value={newSkillTechnologyName} onChange={(e)=>{setNewSkillTechnologyName(e.target.value)}} />
            <input type="number" value={newSkillRating} onChange={(e) => {handleChangeNewSkillRating(e.target.value)}} />
            <button onClick={handleNewSkillSubmit}>Submit</button>
            {
                NewSkillTechnologyNameRecommendation &&
                <select value="" onChange={(e) => selectNameRecommendation(e.target.value)}>
                    {
                        NewSkillTechnologyNameRecommendation.map(recommendation => {
                            return (
                                <option value={recommendation.technology_name}>{recommendation.technology_name}</option>
                            )
                        })
                    }
                </select>
            } 
        </div>
    )
}

export default ProfileSkillsEdit
