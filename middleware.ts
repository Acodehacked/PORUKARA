export {default} from 'next-auth/middleware'

export const config = {matcher:[
    '/admin/',
    '/admin/dashboard',
    '/admin/ChangePassword',
    '/admin/AddQuestions',
    '/admin/Questionare',
    '/admin/Questions',
]}