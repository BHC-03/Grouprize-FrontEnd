import {atom} from 'recoil'

const userInfo = atom({
    key:'userInfoAtom',
    default : {}
})
export default userInfo;