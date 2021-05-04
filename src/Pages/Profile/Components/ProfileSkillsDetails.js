import React from 'react'
import LoadingSpinner from '../../../Components/LoadingSpinner'

const ProfileSkillsDetails = (props) => {

    const {skills} = props

    return (
        <div>
            {
            !skills
            ? <LoadingSpinner />
            :skills.sort((a,b)=> b.technology_rating - a.technology_rating).map(skill => {
                    return(
                        <div className="px-3" key={`${skill.technology_name} + rating`}>
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
