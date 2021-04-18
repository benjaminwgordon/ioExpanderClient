import React from 'react'
import LoadingSpinner from '../../../Components/LoadingSpinner'

const ProfileSkillsDetails = (props) => {

    const {skills} = props

    return (
        <div>
            {
            !skills
            ? <LoadingSpinner />
            :skills.map(skill => {
                    return(
                        <div className="px-3">
                            <span>{skill.technology_name}</span>
                            <span> : {skill.technology_rating}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ProfileSkillsDetails
