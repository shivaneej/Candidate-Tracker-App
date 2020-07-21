export const USER_PERMISSION = {
    read : ['Root', 'Admin', 'OPS'],
    write : ['Root', 'Admin', 'OPS'],
    writeManager : ['Root', 'Admin'],
}

export const ADD_SKILLS = {
    of : ['Interviewer']
}

export const CANDIDATE_PERMISSION = {
    read : ['Admin', 'Recruiter'],
    write : ['Admin', 'Recruiter'],
    create : ['Recruiter']
}

export const CANDIDATE_PROFILE_PERMISSION = {
    read : ['Admin', 'Recruiter'],
    write : ['Admin', 'Recruiter']
}

export const INTERVIEW_PERMISSION = {
    read : ['Recruiter', 'Interviewer'],
    write : ['Recruiter', 'Interviewer'],
    create : ['Recruiter']
}

export const INTERVIEWER_SKILLS_PERMISSION = {
    read : ['Root', 'Admin', 'OPS'],
    write : ['Interviewer']
}

export const STATISTICS_PERMISSION = {
    read : ['Root', 'Admin', 'OPS', 'Recruiter']
}