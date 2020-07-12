export const USER_PERMISSION = {
    read : ['Root', 'Admin', 'OPS'],
    write : ['Root', 'Admin', 'OPS'],
    writeManager : ['Root', 'Admin']
}

export const CANDIDATE_PERMISSION = {
    read : ['Admin', 'Recruiter'],
    write : ['Admin', 'Recruiter']
}

export const INTERVIEW_PERMISSION = {
    read : ['Recruiter', 'Interviewer'],
    write : ['Recruiter', 'Interviewer']
}

export const INTERVIEWER_SKILLS_PERMISSION = {
    read : ['Root', 'Admin', 'OPS'],
    write : ['Interviewer']
}

export const VIEW_STATISTICS = {
    read : ['Root', 'Admin', 'OPS', 'Recruiter']
}