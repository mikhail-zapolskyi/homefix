//New Professional, Semi Pro, Pro, Expert 

const determineFixerSkillLevel = (experience: any) => {
    console.log(experience)
    if(experience > 0) return 'New Professional'
    if(experience >= 2) return 'Semi Professional'
    if(experience >= 5) return 'Professional'
    if(experience >= 10) return 'Expert'
    if(experience >= 15) return 'Grand Expert'
}

export default determineFixerSkillLevel

