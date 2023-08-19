// Amateur, Beginner, Intermediate, Professional, Expert 

const determineFixerSkillLevel = (experience: any) => {
    console.log(experience)
    return experience >= 0 ? 'Beginner'
    : experience >= 2 ? 'Intermediate'
    : experience >= 5 ? 'Professional'
    : experience >= 7 ? 'Expert'
    : 'something wrong'
    
}

export default determineFixerSkillLevel