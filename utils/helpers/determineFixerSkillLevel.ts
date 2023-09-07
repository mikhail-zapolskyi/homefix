//New Professional, Semi Pro, Pro, Expert 

const determineFixerSkillLevel = (experience: any) => {
    console.log(experience)
    switch(experience) {
        case 0:
            return 'New Professional'
        case 1:
            return 'New Professional'
        case 2:
            return 'New Professional'
        case 3:
            return 'Semi Professional'
        case 5:
            return 'Semi Professional'
        case 6:
            return 'Semi Professional'
        case 7: 
            return 'Professional'
        case 8:
            return 'Professional'
        case 9:
            return 'Professional'
        case 10: 
            return 'Expert'
        default:
            return 'Expert'
    }
}

export default determineFixerSkillLevel

