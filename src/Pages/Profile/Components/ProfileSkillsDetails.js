import React from 'react'

const ProfileSkillsDetails = (props) => {

    const {skills} = props

    return (
        <div>
            {
            skills &&
            skills.map(skill => {
                    return(
                        <div>
                            <span>{skill.technology_name}</span>
                            <span> : {skill.rating}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ProfileSkillsDetails
